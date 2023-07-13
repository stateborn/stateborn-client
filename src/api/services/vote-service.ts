import { getIpfsJsonFile } from 'src/api/services/ipfs-service';
import { getUserVoteFromStorage, setUserVote } from 'src/api/services/local-storage-service';
import { UserVotesStorage } from 'src/api/model/user-votes-storage';
import { SingleUserVoteStorage } from 'src/api/model/single-user-vote-storage';
import { abiEncodeVote, isVoteValid } from 'src/api/services/signature-service';
import { ProposalVerification } from 'src/api/model/proposal-verification';
import { VoteDataSource } from 'src/api/model/vote-data-source';
import { ClientVote } from 'src/api/model/ipfs/client-vote';

export const getAllUserVotes = async (proposalIpfsHash: string, userAddress: string): Promise<SingleUserVoteStorage[]> => {
  const userVote = await getUserVoteFromStorage(proposalIpfsHash, userAddress);
  if (userVote !== undefined) {
    return userVote.votes;
  } else {
    return [];
  }
}

export const storeVoteCreatedByUser = async (proposalIpfsHash: string, clientVote: any, voteSignature: string, userAddress: string): Promise<void> => {
  let userVote = await getUserVoteFromStorage(proposalIpfsHash, userAddress);
  if (userVote === undefined) {
    userVote = new UserVotesStorage(proposalIpfsHash, []);
  }
  userVote.votes.push(new SingleUserVoteStorage(clientVote, VoteDataSource.CLIENT, voteSignature));
  await setUserVote(proposalIpfsHash, userAddress, userVote);
  console.log('Saved user vote locally. It will be validated later with server response');
};

const validateVoteAndGetUpdatedVote = async (
    proposalIpfsHash: string,
    voteIpfsHash: string,
    userAddress: string,
    backendClientVote: ClientVote,
    givenVoteToValidate?: SingleUserVoteStorage): Promise<SingleUserVoteStorage> => {
  let voteToValidate = givenVoteToValidate;
  let proposalVerification;
  let ipfsVote = undefined;
  try {
    ipfsVote = await getIpfsJsonFile(voteIpfsHash);
    console.log(`IPFS vote ${voteIpfsHash} read: `, ipfsVote);
  } catch (err) {
    console.log(`Vote ${voteIpfsHash} validation IPFS error: `, err);
    const error = 'Verification with IPFS failed: IPFS connection problem occurred';
    console.log(error);
    proposalVerification = new ProposalVerification(
      false,
      false,
      error)
  }
  if (ipfsVote !== undefined) {
      // Vote could be removed from local storage so it's not found
    if (voteToValidate === undefined) {
      voteToValidate = new SingleUserVoteStorage(ipfsVote.clientVote, VoteDataSource.IPFS, ipfsVote.userSignature, voteIpfsHash);
    } else {
      voteToValidate.voteIpfsHash = voteIpfsHash;
      voteToValidate.userSignature = ipfsVote.userSignature;
      if (voteToValidate.voteDataSource === VoteDataSource.BACKEND) {
        voteToValidate.voteDataSource = VoteDataSource.IPFS;
      }
    }
    // In case of local vote not available, this in fact is "pointless" because IPFS vote is now voteToValidate
    if (areClientVotesTheSame(proposalIpfsHash, voteToValidate.clientVote, ipfsVote.clientVote)) {
      if (areClientVotesTheSame(proposalIpfsHash, voteToValidate.clientVote, backendClientVote)) {
        if (isVoteValid(ipfsVote.clientVote, voteToValidate.userSignature!)) {
          voteToValidate.voteVerification = new ProposalVerification(
            true,
            true,
          );
          console.log(`Vote ${voteIpfsHash} is valid.`);
        } else {
          const error = `Verification with IPFS failed: IPFS vote ${voteIpfsHash} signature is not valid. Vote is not signed by ${userAddress}`;
          voteToValidate.voteVerification = new ProposalVerification(
            true,
            false,
            error
          );
          console.log(error);
        }
      } else {
        const error = `Verification failed: locally saved vote ${voteIpfsHash} doesn't match vote returned by backend.`;
        voteToValidate.voteVerification = new ProposalVerification(
          true,
          false,
          error
        );
        console.log(error);
      }
    } else {
      const error = `Verification with IPFS failed: locally saved vote ${voteIpfsHash} doesn't match vote saved in IPFS.`;
      voteToValidate.voteVerification = new ProposalVerification(
        true,
        false,
        error
      );
      console.log(error);
    }
  } else {
    if (voteToValidate === undefined) {
      voteToValidate = new SingleUserVoteStorage(
        backendClientVote,
        VoteDataSource.BACKEND,
        undefined,
        voteIpfsHash);
    } else {
      voteToValidate.voteIpfsHash = voteIpfsHash;
    }
    // if is undefined it means there was no IPFS exception and simply vote under given hash doesn't exist
    if (proposalVerification === undefined) {
      const error = `Verification with IPFS failed: vote ${proposalIpfsHash} is not found in IPFS.`;
      console.log(error);
      proposalVerification = new ProposalVerification(
        true,
        false,
        error,
      );
    }
    voteToValidate.voteVerification = proposalVerification;
  }
  return voteToValidate;
}

export const validateVoteAndUpdateInStorage = async (proposalIpfsHash: string, voteIpfsHash: string, userAddress: string, backendClientVote: ClientVote, backendClientVoteSignature: string): Promise<void> => {
  console.log(`Vote ${voteIpfsHash} validation process started`);
  let userVotesStorage = await getUserVoteFromStorage(proposalIpfsHash, userAddress);
  if (userVotesStorage === undefined) {
    // It might be a case when it's deleted (by clearing IndexDB) so recreate
    userVotesStorage = new UserVotesStorage(proposalIpfsHash, []);
  }
  let updatedVote: SingleUserVoteStorage | undefined = undefined;
  const savedSingleUserVoteWithIpfsHash = userVotesStorage.votes.filter((_) => _.voteIpfsHash === voteIpfsHash)[0];
  if (savedSingleUserVoteWithIpfsHash === undefined) {
    // must be validated
    // IPFS hash was unknown before sending to backend, so filter based on clientVote values
    const abiEncodedBackendVote = abiEncodeVote(
      backendClientVote.voterAddress,
      proposalIpfsHash,
      backendClientVote.vote,
      backendClientVote.votingPower,
      backendClientVote.voteDate);
    // Can be undefined (when IndexDB was cleared or on different browser)
    const voteToValidate: SingleUserVoteStorage | undefined = userVotesStorage.votes.filter((_) =>
      abiEncodedBackendVote === abiEncodeVote(_.clientVote.voterAddress, proposalIpfsHash, _.clientVote.vote, _.clientVote.votingPower, _.clientVote.voteDate))[0];
    updatedVote = await validateVoteAndGetUpdatedVote(proposalIpfsHash, voteIpfsHash, userAddress, backendClientVote, voteToValidate);

    // if must repeat validation
  } else if (savedSingleUserVoteWithIpfsHash.voteVerification && !savedSingleUserVoteWithIpfsHash.voteVerification.isVerified) {
      updatedVote = await validateVoteAndGetUpdatedVote(proposalIpfsHash, voteIpfsHash, userAddress, backendClientVote, savedSingleUserVoteWithIpfsHash);
  }
  if (updatedVote !== undefined) {
    userVotesStorage.votes = userVotesStorage.votes.filter((_) => _.userSignature !== backendClientVoteSignature);
    userVotesStorage.votes.push(updatedVote);
    await setUserVote(proposalIpfsHash, userAddress, userVotesStorage);
    console.log(`Vote ${voteIpfsHash} for proposal ${proposalIpfsHash} validated and saved locally!`);
  } else {
    console.log(`Skip: vote ${voteIpfsHash} for proposal ${proposalIpfsHash} already validated and saved locally.`);
  }
};

const areClientVotesTheSame = (proposalIpfsHash: string, clientVoteA: ClientVote, clientVoteB: ClientVote): boolean => {
  const encodedVoteFromStorage = abiEncodeVote(clientVoteB.voterAddress, proposalIpfsHash, clientVoteB.vote, clientVoteB.votingPower, clientVoteB.voteDate);
  const encodedVoteFromBackend = abiEncodeVote(clientVoteA.voterAddress, proposalIpfsHash, clientVoteA.vote, clientVoteA.votingPower, clientVoteA.voteDate);
  return encodedVoteFromStorage === encodedVoteFromBackend;
};
