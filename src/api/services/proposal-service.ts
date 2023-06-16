import { Proposal } from 'src/api/model/proposal';
import { getProposalFromStorage, setProposalInStorage } from 'src/api/services/local-storage-service';
import { api } from 'boot/axios';

export const getProposal = async (proposalIpfsHash: string): Promise<Proposal> => {
  const proposal: Proposal | undefined = await getProposalFromStorage(proposalIpfsHash);
  if (proposal === undefined) {
    const res = await api.get(`/api/rest/v1/proposal/${proposalIpfsHash}`);
    const newProposal = new Proposal(
      res.data.clientProposal.title,
      res.data.clientProposal.description,
      res.data.clientProposal.endDateUtc,
      res.data.clientProposal.startDateUtc,
      res.data.clientProposal.proposalType,
      res.data.ipfsHash,
      res.data.clientProposal.creatorAddress,
      res.data.clientProposal.data,
    );
    await setProposalInStorage(proposalIpfsHash, newProposal);
    return newProposal;
  } else {
    return proposal;
  }
}
