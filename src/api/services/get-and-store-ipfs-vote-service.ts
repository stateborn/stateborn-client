import { getIpfsJsonFile } from 'src/api/services/ipfs-service';
import { getUserVoteFromStorage, setUserVote } from 'src/api/services/local-storage-service';
import { UserVoteStorage } from 'src/api/model/user-vote-storage';
import { SingleUserVoteStorage } from 'src/api/model/single-user-vote-storage';
import { abiEncodeVote, isVoteValid } from 'src/api/services/signature-service';

const voteIsValid = (clientVoteDto: any, signature: string) => {
  const valid = isVoteValid(clientVoteDto, signature);
  if (!valid) {
    console.log(`Fatal: vote ${clientVoteDto.voteIpfsHash} for proposal ${clientVoteDto.proposalIpfsHash} is not valid. Signature is not matching`);
    return false;
  }
  return true;
};

export const storeVoteCreatedByUser = async (proposalIpfsHash: string, clientVote: any, voteSignature: string): Promise<void> => {
  const userVote = getUserVoteFromStorage(proposalIpfsHash);
  if (userVote !== undefined) {
    userVote.votes.push(new SingleUserVoteStorage(
      clientVote,
      voteSignature,
    ));
    setUserVote(proposalIpfsHash, userVote);
  } else {
    setUserVote(proposalIpfsHash, new UserVoteStorage(
      proposalIpfsHash,
      [new SingleUserVoteStorage(
        clientVote,
        voteSignature,
      )],
    ));
  }
  console.log('Saved user vote locally. It will be validated later with server response');
};

export const fetchAndStoreIpfsVoteInStorage = async (proposalIpfsHash: string, voteIpfsHash: string): Promise<void> => {
  const userVote = getUserVoteFromStorage(proposalIpfsHash);
  if (userVote !== undefined) {
    const savedSingleUserVoteWithIpfsHash = userVote.votes.filter((_) => _.voteIpfsHash === voteIpfsHash)[0];
    if (savedSingleUserVoteWithIpfsHash === undefined) {
      const ipfsVote = await getIpfsJsonFile(voteIpfsHash);
      console.log('ipfs vote', ipfsVote, userVote.votes);
      const savedUserVoteMatchingSignature = userVote.votes.filter((_) => _.userSignature === ipfsVote.userSignature)[0];
      if (savedUserVoteMatchingSignature !== undefined) {
        // vote is saved locally, but IPFS hash was not yet saved
        if (voteIsValid(ipfsVote.clientVote, savedUserVoteMatchingSignature.userSignature)) {
          savedUserVoteMatchingSignature.voteIpfsHash = voteIpfsHash;
          // update votes
          userVote.votes.filter((_) => _.userSignature !== ipfsVote.userSignature).push(savedUserVoteMatchingSignature);
          setUserVote(proposalIpfsHash, userVote);
          console.log(`Vote ${voteIpfsHash} for proposal ${proposalIpfsHash} validated and IPFS hash updated locally!`);
        } else {
          console.log(`Fatal: expected to find locally user vote having signature ${ipfsVote.userSignature}, but couldnt. There is something malicious happening by the server!`);
        }
      } else {
        console.log(`Fatal: IPFS vote ${voteIpfsHash} has a vote signature, but couldnt find vote matching this signature locally. There is something wrong returned by server or client has removed locally entry for this vote!`);
      }
    } else {
      console.log(`Skip: vote ${voteIpfsHash} for proposal ${proposalIpfsHash} already validated and saved locally.`);
    }
  } else {
    console.log(`Fatal: it should not happen, but cannot find user vote entry in local storage for proposal ${proposalIpfsHash}. It should be saved on vote creation!`);
  }
};

export const verifyBackendReceivedVoteWithLocal = (proposalIpfsHash: string, voteIpfsHash: string, backendClientVote: any): boolean => {
  const userVote = getUserVoteFromStorage(proposalIpfsHash);
  if (userVote !== undefined) {
    const singleUserVote = userVote.votes.filter((_) => _.voteIpfsHash === voteIpfsHash)[0];
    if (singleUserVote) {
      const encodedVoteFromStorage = abiEncodeVote(singleUserVote.clientVote.voterAddress, proposalIpfsHash, singleUserVote.clientVote.vote, singleUserVote.clientVote.votingPower);
      const encodedVoteFromBackend = abiEncodeVote(backendClientVote.voterAddress, proposalIpfsHash, backendClientVote.vote, backendClientVote.votingPower);
      if (encodedVoteFromStorage === encodedVoteFromBackend) {
        console.log(`Backend vote ${voteIpfsHash} for proposal ${proposalIpfsHash} validated`);
        return true;
      } else {
        console.log(`Fatal: backend returned user vote looks like malicious. Not the same as locally saved for vote ${voteIpfsHash} for proposal ${proposalIpfsHash}`);
      }
    } else {
      console.log(`Fatal: single user vote entry for vote ${voteIpfsHash} is not locally saved for proposal ${proposalIpfsHash}`);
    }
  } else {
    console.log(`Fatal: user vote entry is not locally saved for proposal ${proposalIpfsHash}`);
  }
  return false;
};
