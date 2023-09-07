import { api } from 'boot/axios';
import { ProposalReport } from 'src/api/model/proposal-report';
import { getProposalReportFromStorage, setProposalReportInStorage } from 'src/api/services/indexdb-service';
import cloneDeep from 'lodash/cloneDeep';

export const getProposalReport = async (proposalIpfsHash: string): Promise<ProposalReport | undefined> => {
    const proposalReport: ProposalReport | undefined = await getProposalReportFromStorage(proposalIpfsHash);
    if (proposalReport === undefined) {
        try {
            const res = await api.get(`/api/rest/v1/proposal/${proposalIpfsHash}/report`);
            const newProposalReport =  new ProposalReport(
                res.data.ipfsHash,
                res.data.merkleRootHex,
                res.data.proposalResult,
            );
            await setProposalReportInStorage(proposalIpfsHash, newProposalReport);
            return cloneDeep(newProposalReport)
        } catch (err) {
            if ((<any>err).response.status === 404) {
                console.log('Fetch failed - proposal report not yet generated');
                return undefined;
            } else {
                throw err;
            }
        }
    } else {
        return cloneDeep(proposalReport);
    }
}
