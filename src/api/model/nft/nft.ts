import { NftAttribute } from 'src/api/model/nft/nft-attribute';

export class Nft {
  name: string;
  description: string;
  attributes: NftAttribute[];
  image: string;
  thumbnail: string;

  constructor(name: string, description: string, attributes: NftAttribute[], image: string, thumbnail: string) {
    this.name = name;
    this.description = description;
    this.attributes = attributes;
    this.image = image;
    this.thumbnail = thumbnail;
  }
}
