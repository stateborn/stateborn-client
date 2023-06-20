import { BackendProposal } from 'src/api/model/backend-proposal';
import { getProposalFromStorage, setProposalInStorage } from 'src/api/services/local-storage-service';
import { api } from 'boot/axios';
import { getIpfsJsonFile } from 'src/api/services/ipfs-service';
import { ProposalVerification } from 'src/api/model/proposal-verification';
import { abiEncodeProposal, isProposalValid } from 'src/api/services/signature-service';
import { ClientProposal } from 'src/api/model/ipfs/client-proposal';
import { ProposalReport } from 'src/api/model/proposal-report';

export const getProposal = async (proposalIpfsHash: string): Promise<BackendProposal> => {
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

export const compareAndUpdateProposalWithIpfsProposalIfNeeded = async (proposalIpfsHash: string): Promise<void> => {
  const proposal: BackendProposal | undefined = await getProposalFromStorage(proposalIpfsHash);
  if (proposal !== undefined) {
    const proposalVerification: ProposalVerification | undefined = proposal.proposalVerification;
    if (proposalVerification === undefined || proposalVerification.verificationToBeRepeated) {
      proposal.proposalVerification = await getProposalVerificationToSave(proposalIpfsHash, proposal);
      await setProposalInStorage(proposalIpfsHash, proposal);
      console.log(`Proposal ${proposalIpfsHash} verified with IPFS document.`);
    }
  } else {
    console.log(`Verification with IPFS failed: proposal ${proposalIpfsHash} is not saved in client db`);
  }
}

const getProposalVerificationToSave = async (proposalIpfsHash: string, backendProposal: BackendProposal): Promise<ProposalVerification> => {
  let proposalIpfs;
  try {
    proposalIpfs = await getIpfsJsonFile(proposalIpfsHash);
  } catch (err) {
    const error = 'Verification with IPFS failed: IPFS connection problem occurred';
    console.log(error, err);
    return new ProposalVerification(
      true,
      false,
      true,
      error);
  }
  if (proposalIpfs !== undefined) {
    const ipfsClientProposal: ClientProposal = proposalIpfs.clientProposal;
    const abiEncodedIpfsProposal = abiEncodeProposal(ipfsClientProposal);
    const abiEncodedBackendProposal = abiEncodeProposal(backendProposal.clientProposal);
    if (abiEncodedIpfsProposal !== abiEncodedBackendProposal) {
      const error = `Verification with IPFS failed: proposal ${proposalIpfsHash} doesn't match proposal saved in IPFS.`;
      console.log(error);
      return new ProposalVerification(
        true,
        false,
        false,
        error);
    } else {
      const isIpfsProposalSignatureValid = isProposalValid(ipfsClientProposal, proposalIpfs.creatorSignature);
      if (isIpfsProposalSignatureValid) {
        console.log(`Proposal ${proposalIpfsHash} is validated with IPFS document.`);
        return new ProposalVerification(
          true,
          true,
          false,
        );
      } else {
        const error = `Verification with IPFS failed: IPFS proposal signature is not valid. Proposal is not signed by ${ipfsClientProposal.creatorAddress}`;
        console.log(error);
        return new ProposalVerification(
          true,
          false,
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
      true,
      error);
  }
}
