import { getProposalReportFromStorage, setProposalReportInStorage } from 'src/api/services/local-storage-service';
import { api } from 'boot/axios';
import { ProposalReport } from 'src/api/model/proposal-report';

export const getProposalReport = async (proposalIpfsHash: string): Promise<ProposalReport> => {
  const proposalReport: ProposalReport | undefined = await getProposalReportFromStorage(proposalIpfsHash);
  if (proposalReport === undefined) {
    const res = await api.get(`/api/rest/v1/proposal/${proposalIpfsHash}/report`);
    const newProposalReport = new ProposalReport(
      res.data.ipfsHash,
      res.data.merkleRootHex,
    );
    await setProposalReportInStorage(proposalIpfsHash, newProposalReport);
    return newProposalReport;
  } else {
    return proposalReport;
  }
}
