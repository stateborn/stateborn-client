import { ProposalVerification } from 'src/api/model/proposal-verification';
import { VoteDataSource } from 'src/api/model/vote-data-source';
import { ClientVote } from 'src/api/model/ipfs/client-vote';

export class SingleUserVoteStorage {
  clientVote: ClientVote;
  // 'BACKEND' - data read from backend, not validated yet with ipfs (and not with local)
  // 'IPFS' - data returned by backend validated with IPFS document content
  // 'LOCAL' - data returned by backend validated with IPFS document content and locally saved vote. In case of IndexedDB removal, this level cannot be reached anymore (no local vote).
  voteDataSource: VoteDataSource;
  userSignature?: string;
  voteVerification?: ProposalVerification;
  voteIpfsHash?: string;

  constructor(clientVote: ClientVote, voteDataSource: VoteDataSource,userSignature?: string, voteIpfsHash?: string, voteVerification?: ProposalVerification) {
    this.voteIpfsHash = voteIpfsHash;
    this.voteDataSource = voteDataSource;
    this.userSignature = userSignature;
    this.clientVote = clientVote;
    this.voteVerification = voteVerification;
  }
}
