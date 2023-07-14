import { BackendProposal } from 'src/api/model/backend-proposal';
import { getProposalFromStorage, setProposalInStorage } from 'src/api/services/local-storage-service';
import { api } from 'boot/axios';
import { getIpfsJsonFile } from 'src/api/services/ipfs-service';
import { ProposalVerification } from 'src/api/model/proposal-verification';
import { abiEncodeProposal, isProposalValid } from 'src/api/services/signature-service';
import { ClientProposal } from 'src/api/model/ipfs/client-proposal';

export const getProposal = async (proposalIpfsHash: string, onValidationDoneCallback?: (backendProposal: BackendProposal) => void): Promise<BackendProposal> => {
  const backendProposal: BackendProposal = await getProposalFromStorageOrFetch(proposalIpfsHash);
  if (!backendProposal.proposalVerification?.isVerified) {
    // async, if fails will be retried on next call
    verifyProposalWithIpfsContent(backendProposal).then(async () => {
      const backendProposalAfterValidationDone = await getProposalFromStorageOrFetch(proposalIpfsHash);
      if (onValidationDoneCallback) {
        onValidationDoneCallback(backendProposalAfterValidationDone);
      }
    });
  }
  return backendProposal;
}

const getProposalFromStorageOrFetch = async (proposalIpfsHash: string): Promise<BackendProposal> => {
  const proposal: BackendProposal | undefined = await getProposalFromStorage(proposalIpfsHash);
  if (proposal === undefined) {
    const res = await api.get(`/api/rest/v1/proposal/${proposalIpfsHash}`);
    const newProposal = new BackendProposal(
      new ClientProposal(
        res.data.clientProposal.creatorAddress,
        res.data.clientProposal.daoIpfsHash,
        res.data.clientProposal.title,
        res.data.clientProposal.description,
        res.data.clientProposal.proposalType,
        res.data.clientProposal.startDateUtc,
        res.data.clientProposal.endDateUtc,
        res.data.clientProposal.blockNumber,
        res.data.clientProposal.data,
      ),
      proposalIpfsHash,
    );
    await setProposalInStorage(proposalIpfsHash, newProposal);
    return newProposal;
  } else {
    return proposal;
  }
}

const verifyProposalWithIpfsContent = async (proposal: BackendProposal): Promise<void> => {
  proposal.proposalVerification = await getProposalVerificationToSave(proposal.ipfsHash, proposal);
  await setProposalInStorage(proposal.ipfsHash, proposal);
}

const getProposalVerificationToSave = async (proposalIpfsHash: string, backendProposal: BackendProposal): Promise<ProposalVerification> => {
  let proposalIpfs;
  try {
    proposalIpfs = await getIpfsJsonFile(proposalIpfsHash);
  } catch (err) {
    const error = 'Verification with IPFS failed: IPFS connection problem occurred';
    console.log(error, err);
    return new ProposalVerification(
      false,
      false,
      error);
  }
  if (proposalIpfs !== undefined) {
    const ipfsClientProposal: ClientProposal = proposalIpfs.clientProposal;
    const abiEncodedIpfsProposal = abiEncodeProposal(ipfsClientProposal);
    const abiEncodedBackendProposal = abiEncodeProposal(backendProposal.clientProposal);
    if (abiEncodedIpfsProposal !== abiEncodedBackendProposal) {
      const error = `Verification with IPFS failed: backend proposal ${proposalIpfsHash} doesn't match proposal saved in IPFS.`;
      console.log(error);
      return new ProposalVerification(
        true,
        false,
        error);
    } else {
      if (isProposalValid(ipfsClientProposal, proposalIpfs.creatorSignature)) {
        console.log(`Proposal ${proposalIpfsHash} is validated with IPFS document.`);
        return new ProposalVerification(
          true,
          true,
        );
      } else {
        const error = `Verification with IPFS failed: IPFS proposal signature is not valid. Proposal is not signed by ${ipfsClientProposal.creatorAddress}`;
        console.log(error);
        return new ProposalVerification(
          true,
          false,
          error);
      }
    }
  } else {
    const error = `Verification with IPFS failed: proposal ${proposalIpfsHash} is not found in IPFS.`;
    console.log(error);
    return new ProposalVerification(
      true,
      false,
      error);
  }
}
