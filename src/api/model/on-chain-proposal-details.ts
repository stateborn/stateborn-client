export class OnChainProposalDetails {
    address: string;
    ended: boolean;
    passed: boolean;
    forVotes: number;
    againstVotes: number;
    executed: boolean;
    endsDate: Date;

    constructor(address: string, ended: boolean, passed: boolean, forVotes: number, againstVotes: number, executed: boolean, endsDate: Date) {
        this.address = address;
        this.ended = ended;
        this.passed = passed;
        this.forVotes = forVotes;
        this.againstVotes = againstVotes;
        this.executed = executed;
        this.endsDate = endsDate;
    }
}
