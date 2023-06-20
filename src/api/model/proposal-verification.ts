export class ProposalVerification {
  // was verification to IPFS be done?
  isVerified: boolean;
  // is proposal valid comparing to IPFS proposal?
  isValid: boolean;
  // should verification be repeated?
  verificationToBeRepeated: boolean;
  // optional error message
  verificationError?: string;

  constructor(isVerified: boolean, isValid: boolean, verificationToBeRepeated: boolean, verificationError?: string) {
    this.isVerified = isVerified;
    this.isValid = isValid;
    this.verificationToBeRepeated = verificationToBeRepeated;
    this.verificationError = verificationError;
  }
}
