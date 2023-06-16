import { ProposalReportStorage } from 'src/api/model/proposal-report-storage';
import { UserVoteStorage } from 'src/api/model/user-vote-storage';
import Dexie from 'dexie';
import { Proposal } from 'src/api/model/proposal';
import { Dao } from 'src/api/model/dao';
import { ProposalReport } from 'src/api/model/proposal-report';

const db = new Dexie('stateborndb');

// Declare tables, IDs and indexes
db.version(1).stores({
  votes: 'proposalIpfsHash, vote',
  clientProposalReports: 'proposalIpfsHash, proposalReport',
  proposals: 'proposalIpfsHash, proposal',
  daos: 'daoIpfsHash, dao',
  proposalReports: 'proposalIpfsHash, proposalReport'
});

export const getClientProposalReportFromStorage = async (proposalIpfsHash: string): Promise<ProposalReportStorage | undefined> => {
  const item = await db.clientProposalReports.where("proposalIpfsHash").equals(proposalIpfsHash).first();
  return item !== undefined ? JSON.parse(item.proposalReport) : undefined;
};

export const getUserVoteFromStorage = async (proposalIpfsHash: string): Promise<UserVoteStorage | undefined> => {
  const item = await db.votes.where("proposalIpfsHash").equals(proposalIpfsHash).first();
  return item !== undefined ? JSON.parse(item.vote) : undefined;

};
export const setClientProposalReport = async (proposalIpfsHash: string, proposalReportStorage: ProposalReportStorage) => {
  await db.clientProposalReports.put({
    proposalIpfsHash,
    proposalReport: JSON.stringify(proposalReportStorage),
  });
}
// export const setUserVote = (proposalIpfsHash: string, userVoteStorage: UserVoteStorage) => localStorage.setItem(`vote_${proposalIpfsHash}`, JSON.stringify(userVoteStorage));
export const setUserVote = async (proposalIpfsHash: string, userVoteStorage: UserVoteStorage) => {
  await db.votes.put({
    proposalIpfsHash,
    vote: JSON.stringify(userVoteStorage),
  });
}

export const setProposalInStorage = async (proposalIpfsHash: string, proposal: Proposal) => {
  await db.proposals.put({
    proposalIpfsHash,
    proposal,
  });
};

export const getProposalFromStorage = async (proposalIpfsHash: string): Promise<Proposal | undefined> => {
  const item = await db.proposals.where("proposalIpfsHash").equals(proposalIpfsHash).first();
  return item !== undefined ? item.proposal : undefined;
};


export const setDaoInStorage = async (daoIpfsHash: string, dao: Dao) => {
  await db.daos.put({
    daoIpfsHash,
    dao,
  });
};

export const getDaoFromStorage = async (daoIpfsHash: string): Promise<Dao | undefined> => {
  const item = await db.daos.where("daoIpfsHash").equals(daoIpfsHash).first();
  return item !== undefined ? item.dao : undefined;
};

export const setProposalReportInStorage = async (proposalIpfsHash: string, proposalReport: ProposalReport) => {
  await db.proposalReports.put({
    proposalIpfsHash,
    proposalReport,
  });
};

export const getProposalReportFromStorage = async (proposalIpfsHash: string): Promise<ProposalReport | undefined> => {
  const item = await db.proposalReports.where("proposalIpfsHash").equals(proposalIpfsHash).first();
  return item !== undefined ? item.proposalReport : undefined;
};


