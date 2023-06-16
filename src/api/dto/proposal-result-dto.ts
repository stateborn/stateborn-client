import { OptionVoteResultDto } from 'src/api/dto/option-result-dto';

export class ProposalResultDto {
  totalVotes: string;
  totalVotesQuantity: string;
  voteResults: OptionVoteResultDto[];

  constructor(totalVotes: string, totalVotesQuantity: string, voteResults: OptionVoteResultDto[]) {
    this.totalVotes = totalVotes;
    this.totalVotesQuantity = totalVotesQuantity;
    this.voteResults = voteResults;
  }
}
