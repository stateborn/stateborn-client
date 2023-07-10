export class ProposalReportStorage {
  isValid: boolean;
  merkleRootHex: string;
  validationDate: string;
  error?: string;
  errorData?: string;
  userNotVoted?: boolean;
  constructor(isValid: boolean, merkleRootHex: string, validationDate: string, error?: string, errorData?: any, userNotVoted?: boolean) {
    this.isValid = isValid;
    this.merkleRootHex = merkleRootHex;
    this.validationDate = validationDate;
    this.error = error;
    this.errorData = errorData;
    this.userNotVoted = userNotVoted;
  }
}
