import { ProposalReportStorage } from 'src/api/model/proposal-report-storage';
import { UserVoteStorage } from 'src/api/model/user-vote-storage';
import Dexie from 'dexie';
import { BackendProposal } from 'src/api/model/backend-proposal';
import { DaoBackend } from 'src/api/model/dao-backend';

const db = new Dexie('stateborndb');

// Declare tables, IDs and indexes
db.version(1).stores({
  votes: 'proposalIpfsHash_userAddress, vote',
  clientProposalReports: 'proposalIpfsHash_userAddress, proposalReport',
  proposals: 'proposalIpfsHash, proposal',
  daos: 'daoIpfsHash, dao',
});

export const getClientProposalReportFromStorage = async (proposalIpfsHash: string, userAddress: string): Promise<ProposalReportStorage | undefined> => {
  const item = await db.clientProposalReports.where("proposalIpfsHash_userAddress").equals(`${proposalIpfsHash}_${userAddress}`).first();
  return item !== undefined ? JSON.parse(item.proposalReport) : undefined;
};

export const setClientProposalReport = async (proposalIpfsHash: string, userAddress: string, proposalReportStorage: ProposalReportStorage) => {
  await db.clientProposalReports.put({
    proposalIpfsHash_userAddress: `${proposalIpfsHash}_${userAddress}`,
    proposalReport: JSON.stringify(proposalReportStorage),
  });
}
export const getUserVoteFromStorage = async (proposalIpfsHash: string, userAddress: string): Promise<UserVoteStorage | undefined> => {
  const item = await db.votes.where("proposalIpfsHash_userAddress").equals(`${proposalIpfsHash}_${userAddress}`).first();
  return item !== undefined ? JSON.parse(item.vote) : undefined;

};
export const setUserVote = async (proposalIpfsHash: string, userAddress: string, userVoteStorage: UserVoteStorage) => {
  await db.votes.put({
    proposalIpfsHash_userAddress: `${proposalIpfsHash}_${userAddress}`,
    vote: JSON.stringify(userVoteStorage),
  });
}

export const setProposalInStorage = async (proposalIpfsHash: string, proposal: BackendProposal) => {
  await db.proposals.put({
    proposalIpfsHash,
    proposal,
  });
};

export const getProposalFromStorage = async (proposalIpfsHash: string): Promise<BackendProposal | undefined> => {
  const item = await db.proposals.where("proposalIpfsHash").equals(proposalIpfsHash).first();
  return item !== undefined ? item.proposal : undefined;
};


export const setDaoInStorage = async (daoIpfsHash: string, dao: DaoBackend) => {
  await db.daos.put({
    daoIpfsHash,
    dao,
  });
};

export const getDaoFromStorage = async (daoIpfsHash: string): Promise<DaoBackend | undefined> => {
  const item = await db.daos.where("daoIpfsHash").equals(daoIpfsHash).first();
  return item !== undefined ? item.dao : undefined;
};

// export const setProposalReportInStorage = async (proposalIpfsHash: string, proposalReport: ProposalReport) => {
//   await db.proposalReports.put({
//     proposalIpfsHash,
//     proposalReport,
//   });
// };
//
// export const getProposalReportFromStorage = async (proposalIpfsHash: string): Promise<ProposalReport | undefined> => {
//   const item = await db.proposalReports.where("proposalIpfsHash").equals(proposalIpfsHash).first();
//   return item !== undefined ? item.proposalReport : undefined;
// };
