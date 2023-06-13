export class SingleUserVoteStorage {
  clientVote: any;
  userSignature: string;
  voteIpfsHash?: string;

  constructor(clientVote: any, userSignature: string, voteIpfsHash?: string) {
    this.voteIpfsHash = voteIpfsHash;
    this.userSignature = userSignature;
    this.clientVote = clientVote;
  }
}
