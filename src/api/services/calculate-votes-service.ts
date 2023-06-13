import { getIpfsJsonFile } from 'src/api/services/ipfs-service';
import {
  getProposalReportFromStorage,
  setProposalReport,
} from 'src/api/services/local-storage-service';
import { MerkleTreeService } from 'src/api/services/merkle-tree-service';
import { getEncodedReportVoteKeccak256, isVoteValid } from 'src/api/services/signature-service';
import { ProposalReportStorage } from 'src/api/model/proposal-report-storage';
import dayjs from 'dayjs';

// eslint-disable
export const calculateVotesAndGetProposalReportStorage = async (proposalReportIpfsHash: string, proposalIpfsHash: string, userAddress: string): Promise<ProposalReportStorage> => {
  let proposalReportStorage: ProposalReportStorage | undefined = await getProposalReportFromStorage(proposalIpfsHash);
  if (proposalReportStorage === undefined) {
    const ipfsProposalReport = await getIpfsJsonFile(proposalReportIpfsHash);
    const merkleTreeService = new MerkleTreeService();
    const merkleTreeLeafs: string[] = [];
    const votingResults = new Map<string, number>();
    for (const reportUserVote of ipfsProposalReport.userVotes) {
      const ipfsUserVote = await getIpfsJsonFile(reportUserVote.ipfsHash);
      const isUserVoteValid = isVoteValid(ipfsUserVote.clientVote, ipfsUserVote.userSignature);

      if (votingResults.has(ipfsUserVote.clientVote.vote)) {
        let decisionVote: number = votingResults.get(ipfsUserVote.clientVote.vote)!;
        decisionVote += Number(ipfsUserVote.clientVote.votingPower);
        votingResults.set(ipfsUserVote.clientVote.vote, decisionVote);
      } else {
        votingResults.set(ipfsUserVote.clientVote.vote, Number(ipfsUserVote.clientVote.votingPower));
      }

      if (!isUserVoteValid) {
        console.log(`Invalid vote of user ${ipfsUserVote.clientVote.voterAddress} for proposal ${proposalIpfsHash}`);
        proposalReportStorage = new ProposalReportStorage(
          false,
          merkleTreeService.getHexRoot(),
          dayjs().toISOString(),
          undefined,
          `Invalid vote of user ${ipfsUserVote.clientVote.voterAddress} for proposal ${proposalIpfsHash}`,
        );
        setProposalReport(proposalIpfsHash, proposalReportStorage);
        return proposalReportStorage;
      }
      const encodedVoteKeccak256 = await getEncodedReportVoteKeccak256(
        ipfsUserVote.clientVote.voterAddress,
        proposalIpfsHash,
        ipfsUserVote.clientVote.vote,
        ipfsUserVote.clientVote.votingPower,
      );
      merkleTreeLeafs.push(encodedVoteKeccak256);
    }
    merkleTreeService.initializeMerkleTree(merkleTreeLeafs);
    if (merkleTreeService.getHexRoot() !== ipfsProposalReport.merkleRootHex) {
      console.log(`Invalid merkle root for proposal ${proposalIpfsHash}. Got '${merkleTreeService.getHexRoot()}, expected '${ipfsProposalReport.merkleRootHex}'`);
      proposalReportStorage = new ProposalReportStorage(
        false,
        merkleTreeService.getHexRoot(),
        dayjs().toISOString(),
        undefined,
        `Invalid merkle root for proposal ${proposalIpfsHash}. Got '${merkleTreeService.getHexRoot()}, expected '${ipfsProposalReport.merkleRootHex}'`,
      );
    } else {
      console.log(`Proposal ${proposalIpfsHash} was client side validated. Calculated merkle root hex ${merkleTreeService.getHexRoot()} as expected. User votes validated too.`);
      proposalReportStorage = new ProposalReportStorage(
        true,
        merkleTreeService.getHexRoot(),
        dayjs().toISOString(),
        Object.fromEntries(votingResults),
      );
    }
    setProposalReport(proposalIpfsHash, proposalReportStorage);
    return proposalReportStorage;
  }
  console.log(`Proposal ${proposalIpfsHash} was already client side validated at ${proposalReportStorage.validationDate}`);
  return proposalReportStorage;
};
