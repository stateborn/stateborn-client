export class IpfsNftInfo {
  name: string;
  description: string;
  tokenId: number;
  imageBase64: string;


  constructor(name: string, description: string, tokenId: number, imageBase64: string) {
    this.name = name;
    this.description = description;
    this.tokenId = tokenId;
    this.imageBase64 = imageBase64;
  }
}
