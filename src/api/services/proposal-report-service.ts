import { api } from 'boot/axios';
import { ProposalReport } from 'src/api/model/proposal-report';

export const getProposalReport = async (proposalIpfsHash: string): Promise<ProposalReport> => {
    const res = await api.get(`/api/rest/v1/proposal/${proposalIpfsHash}/report`);
  return new ProposalReport(
      res.data.ipfsHash,
      res.data.merkleRootHex,
    );
}
