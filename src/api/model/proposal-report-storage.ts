export class ProposalReportStorage {
  isValid: boolean;
  merkleRootHex: string;
  validationDate: string;
  results?: any;
  error?: string;
  constructor(isValid: boolean, merkleRootHex: string, validationDate: string, results?: any, error?: string) {
    this.isValid = isValid;
    this.merkleRootHex = merkleRootHex;
    this.validationDate = validationDate;
    this.results = results;
    this.error = error;
  }
}
