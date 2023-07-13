
export class ClientVote {

  public voterAddress: string;
  public proposalIpfsHash: string;
  public vote: string;
  public votingPower: string;
  public voteDate: string;

  constructor(voterAddress: string, proposalIpfsHash: string, vote: string, votingPower: string, voteDate: string) {
    this.voterAddress = voterAddress;
    this.proposalIpfsHash = proposalIpfsHash;
    this.vote = vote;
    this.votingPower = votingPower;
    this.voteDate = voteDate;
  }
}
