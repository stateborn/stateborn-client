//
// const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';
// const PASSWORD_PROOF_KEY = 'PASSWORD_PROOF';
// const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN';
// const ACCESS_TOKEN_SAVE_DATE_KEY = 'ACCESS_TOKEN_SAVE_DATE';
//
// export const cleanSessionInStorage = () => {
//   localStorage.removeItem(ACCESS_TOKEN_KEY);
//   localStorage.removeItem(ACCESS_TOKEN_SAVE_DATE_KEY);
//   localStorage.removeItem(REFRESH_TOKEN_KEY);
// };
//
// export const setNewAccessTokenInStorage = (accessToken: string, afterLogin: boolean) => {
//   localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
//   localStorage.setItem(ACCESS_TOKEN_SAVE_DATE_KEY, Date.now().toString());
//   // without there was a case that after first login (accessToken and refreshToken have not password_proof yet encoded)
//   // user was not reloging so refresh token was used and
//   // new jwt token had empty password proof (backend takes it from existing token when new accessToken on refreshing)
//   // so was setting in localStorage empty value of passwordProof what caused wrong screens showing (setup password page when already was..)
// };
//
// export const setNetRefreshTokenInStorage = (refreshToken: string) => {
//   localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
// };

import { ProposalReportStorage } from 'src/api/model/proposal-report-storage';
import { UserVoteStorage } from 'src/api/model/user-vote-storage';

export const getProposalReportFromStorage = (proposalIpfsHash: string): ProposalReportStorage | undefined => {
  const item = localStorage.getItem(proposalIpfsHash);
  return item !== null ? JSON.parse(item) : undefined;
};
export const getUserVoteFromStorage = (proposalIpfsHash: string): UserVoteStorage | undefined => {
  const item = localStorage.getItem(`vote_${proposalIpfsHash}`);
  return item !== null ? JSON.parse(item) : undefined;
};
export const setProposalReport = (proposalIpfsHash: string, proposalReportStorage: ProposalReportStorage) => localStorage.setItem(proposalIpfsHash, JSON.stringify(proposalReportStorage));
export const setUserVote = (proposalIpfsHash: string, userVoteStorage: UserVoteStorage) => localStorage.setItem(`vote_${proposalIpfsHash}`, JSON.stringify(userVoteStorage));
