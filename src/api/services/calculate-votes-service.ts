import { getIpfsJsonFile } from 'src/api/services/ipfs-service';
import {
  getClientProposalReportFromStorage, getUserVoteFromStorage,
  setClientProposalReport,
} from 'src/api/services/local-storage-service';
import { MerkleTreeService } from 'src/api/services/merkle-tree-service';
import { abiEncodeVote, getEncodedReportVoteKeccak256, isVoteValid } from 'src/api/services/signature-service';
import { ProposalReportStorage } from 'src/api/model/proposal-report-storage';
import dayjs from 'dayjs';

export const calculateUserVotesAndGetProposalReportStorage = async (proposalReportIpfsHash: string, proposalIpfsHash: string, userAddress: string): Promise<ProposalReportStorage> => {
  let proposalReportStorage: ProposalReportStorage | undefined = await getClientProposalReportFromStorage(proposalIpfsHash, userAddress);
  if (proposalReportStorage === undefined) {
    const ipfsProposalReport = await getIpfsJsonFile(proposalReportIpfsHash);
    const merkleTreeService = new MerkleTreeService();
    const merkleTreeLeafs: string[] = [];
    const userIpfsVotes = [];
    let userVoteLeaf = '';
    for (const ipfsVote of ipfsProposalReport.userVotes) {
      // Save leaf provided by backend for user votes, it will be later compared with leaf calculated on client side
      if (ipfsVote.voterAddress === userAddress) {
        userIpfsVotes.push(ipfsVote);
        userVoteLeaf = ipfsVote.leafEncoded;
      }
      merkleTreeLeafs.push(ipfsVote.leafEncoded);
    }
    if (userIpfsVotes.length  === 0) {
      proposalReportStorage = new ProposalReportStorage(
        true,
        ipfsProposalReport.merkleRootHex,
        dayjs().toISOString(),
        undefined,
        undefined,
        true
      );
    // If there is more than one user vote in report, it means backend included more than should and it's not correct
    } else if (userIpfsVotes.length > 0) {
      proposalReportStorage = new ProposalReportStorage(
        false,
        'not calculated',
        dayjs().toISOString(),
        `Expected only 1 user vote in the IPFS result, but found ${userIpfsVotes.length}!`,
        userIpfsVotes,
      );
    }
    else {
      const userIpfsVote = userIpfsVotes[0];
      // Fetch user vote from IPFS
      const ipfsUserVote = await getIpfsJsonFile(userIpfsVote.ipfsHash);
      const isUserVoteValid = isVoteValid(ipfsUserVote.clientVote, ipfsUserVote.userSignature);
      // If IPFS user vote included in report is incorrect, it means backend changed the vote and it's incorrect
      if (!isUserVoteValid) {
        proposalReportStorage = new ProposalReportStorage(
          false,
          'not calculated',
          dayjs().toISOString(),
          `Invalid IPFS vote of user ${ipfsUserVote.clientVote.voterAddress} for proposal ${proposalIpfsHash}. It's not signed by ${userAddress}.`,
          ipfsUserVote
        );
      } else {
        const userVoteStorage = await getUserVoteFromStorage(proposalIpfsHash, userAddress);
        // If user didn't clear their storage, it should be saved on voting
        // but can be also empty because user uses different browser or cleared storage
        // in that case this validation must be skipped
        if (userVoteStorage !== undefined) {
          const lastUserVoteFromStorage = userVoteStorage!.votes[userVoteStorage?.votes.length - 1];
          const encodedVoteFromReportIpfsFile = abiEncodeVote(ipfsUserVote.clientVote.voterAddress, proposalIpfsHash, ipfsUserVote.clientVote.vote, ipfsUserVote.clientVote.votingPower, ipfsUserVote.clientVote.voteDate);
          const encodedVoteFromStorage = abiEncodeVote(lastUserVoteFromStorage.clientVote.voterAddress, proposalIpfsHash, lastUserVoteFromStorage.clientVote.vote, lastUserVoteFromStorage.clientVote.votingPower, lastUserVoteFromStorage.clientVote.votingPower);
          // Validated that IPFS vote included in report is the last one user submitted (because can vote many times, but only last vote is valid)
          if (encodedVoteFromReportIpfsFile !== encodedVoteFromStorage) {
            proposalReportStorage = new ProposalReportStorage(
              false,
              'not calculated',
              dayjs().toISOString(),
              `Invalid IPFS vote of user ${ipfsUserVote.clientVote.voterAddress} for proposal ${proposalIpfsHash}. It's not a final vote ${userAddress} submitted.`,
              ipfsUserVote
            );
          } else {
            const encodedVoteFromLastUserVoteFromStorage = await getEncodedReportVoteKeccak256(
              lastUserVoteFromStorage.clientVote.voterAddress,
              proposalIpfsHash,
              lastUserVoteFromStorage.clientVote.vote,
              lastUserVoteFromStorage.clientVote.votingPower,
            );
            if (encodedVoteFromLastUserVoteFromStorage !== userVoteLeaf) {
              proposalReportStorage = new ProposalReportStorage(
                false,
                'not calculated',
                dayjs().toISOString(),
                `Invalid merkle leaf encoded of user ${ipfsUserVote.clientVote.voterAddress} for proposal ${proposalIpfsHash}. The leaf value provided by backend doesn't match leaf value of last user vote.`,
                ipfsUserVote
              );
            }
          }
        } else {
          // If user votes are not saved client side, let's verify that backend correctly calculated merkle leaf for the IPFS user document
          const encodedVoteFromLastUserVoteFromStorage = await getEncodedReportVoteKeccak256(
            ipfsUserVote.clientVote.voterAddress,
            proposalIpfsHash,
            ipfsUserVote.clientVote.vote,
            ipfsUserVote.clientVote.votingPower,
          );
          if (encodedVoteFromLastUserVoteFromStorage !== userVoteLeaf) {
            proposalReportStorage = new ProposalReportStorage(
              false,
              'not calculated',
              dayjs().toISOString(),
              `Invalid merkle leaf encoded of user ${ipfsUserVote.clientVote.voterAddress} for proposal ${proposalIpfsHash}. Merkle leaf value for user vote in the report is wrongly calculated.`,
              ipfsUserVote
            );
          }
        }
      }
    }
    // if not voted -> don't verify merkle root
    if (proposalReportStorage?.userNotVoted !== true) {
      merkleTreeService.initializeMerkleTree(merkleTreeLeafs);
      // If client side calculated merkle root is not the same as the one from IPFS report, it means backend changed the votes and it's incorrect
      // Because we calculated user leaf on client side, it is verified that included user vote is correct and matches the one user submitted
      // * - note that if user cleared their storage, the step of verification if it the last vote of user was
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
        );
      }
    }
    await setClientProposalReport(proposalIpfsHash, userAddress, proposalReportStorage);
    return proposalReportStorage;
  }
  console.log(`Proposal ${proposalIpfsHash} was already client side validated at ${proposalReportStorage.validationDate}`);
  return proposalReportStorage;
};


// eslint-disable
// export const calculateVotesAndGetProposalReportStorage = async (proposalReportIpfsHash: string, proposalIpfsHash: string, userAddress: string): Promise<ProposalReportStorage> => {
//   let proposalReportStorage: ProposalReportStorage | undefined = await getClientProposalReportFromStorage(proposalIpfsHash);
//   if (proposalReportStorage === undefined) {
//     const ipfsProposalReport = await getIpfsJsonFile(proposalReportIpfsHash);
//     const merkleTreeService = new MerkleTreeService();
//     const merkleTreeLeafs: string[] = [];
//     const votingResults = new Map<string, number>();
//     for (const reportUserVote of ipfsProposalReport.userVotes) {
//       const ipfsUserVote = await getIpfsJsonFile(reportUserVote.ipfsHash);
//       const isUserVoteValid = isVoteValid(ipfsUserVote.clientVote, ipfsUserVote.userSignature);
//
//       if (votingResults.has(ipfsUserVote.clientVote.vote)) {
//         let decisionVote: number = votingResults.get(ipfsUserVote.clientVote.vote)!;
//         decisionVote += Number(ipfsUserVote.clientVote.votingPower);
//         votingResults.set(ipfsUserVote.clientVote.vote, decisionVote);
//       } else {
//         votingResults.set(ipfsUserVote.clientVote.vote, Number(ipfsUserVote.clientVote.votingPower));
//       }
//
//       if (!isUserVoteValid) {
//         console.log(`Invalid vote of user ${ipfsUserVote.clientVote.voterAddress} for proposal ${proposalIpfsHash}`);
//         proposalReportStorage = new ProposalReportStorage(
//           false,
//           merkleTreeService.getHexRoot(),
//           dayjs().toISOString(),
//           undefined,
//           `Invalid vote of user ${ipfsUserVote.clientVote.voterAddress} for proposal ${proposalIpfsHash}`,
//         );
//         await setClientProposalReport(proposalIpfsHash, proposalReportStorage);
//         return proposalReportStorage;
//       }
//       const encodedVoteKeccak256 = await getEncodedReportVoteKeccak256(
//         ipfsUserVote.clientVote.voterAddress,
//         proposalIpfsHash,
//         ipfsUserVote.clientVote.vote,
//         ipfsUserVote.clientVote.votingPower,
//       );
//       merkleTreeLeafs.push(encodedVoteKeccak256);
//     }
//     merkleTreeService.initializeMerkleTree(merkleTreeLeafs);
//     if (merkleTreeService.getHexRoot() !== ipfsProposalReport.merkleRootHex) {
//       console.log(`Invalid merkle root for proposal ${proposalIpfsHash}. Got '${merkleTreeService.getHexRoot()}, expected '${ipfsProposalReport.merkleRootHex}'`);
//       proposalReportStorage = new ProposalReportStorage(
//         false,
//         merkleTreeService.getHexRoot(),
//         dayjs().toISOString(),
//         undefined,
//         `Invalid merkle root for proposal ${proposalIpfsHash}. Got '${merkleTreeService.getHexRoot()}, expected '${ipfsProposalReport.merkleRootHex}'`,
//       );
//     } else {
//       console.log(`Proposal ${proposalIpfsHash} was client side validated. Calculated merkle root hex ${merkleTreeService.getHexRoot()} as expected. User votes validated too.`);
//       proposalReportStorage = new ProposalReportStorage(
//         true,
//         merkleTreeService.getHexRoot(),
//         dayjs().toISOString(),
//         Object.fromEntries(votingResults),
//       );
//     }
//     await setClientProposalReport(proposalIpfsHash, proposalReportStorage);
//     return proposalReportStorage;
//   }
//   console.log(`Proposal ${proposalIpfsHash} was already client side validated at ${proposalReportStorage.validationDate}`);
//   return proposalReportStorage;
// };
