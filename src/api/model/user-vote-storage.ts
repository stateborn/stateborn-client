import { SingleUserVoteStorage } from 'src/api/model/single-user-vote-storage';

export class UserVoteStorage {
  proposalIpfsHash: string;
  // oldest votes first in array
  votes: SingleUserVoteStorage[];

  constructor(proposalIpfsHash: string, votes: SingleUserVoteStorage[]) {
    this.proposalIpfsHash = proposalIpfsHash;
    this.votes = votes;
  }
}
