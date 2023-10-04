import { NftDto } from './nft-dto';
import { ClientToken } from 'src/api/model/ipfs/client-token';

export class AssetDataDto {
    token: ClientToken;

    //only for AssetType.NFT
    nft?: NftDto;
    constructor(token: ClientToken, nft: NftDto) {
        this.token = token;
        this.nft = nft;
    }
}
