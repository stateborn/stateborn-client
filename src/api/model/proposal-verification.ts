export class ProposalVerification {
  // was verification to IPFS be done?
  // if false, then verification should be repeated
  isVerified: boolean;
  // is proposal valid comparing to IPFS proposal?
  isValid: boolean;
  // optional error message
  verificationError?: string;

  constructor(isVerified: boolean, isValid: boolean, verificationError?: string) {
    this.isVerified = isVerified;
    this.isValid = isValid;
    this.verificationError = verificationError;
  }
}
