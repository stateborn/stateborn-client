import { AssetDataDto } from './asset-data-dto';

export class AssetDto {
    assetData: AssetDataDto;
    assetBalance: number;

    constructor(assetData: AssetDataDto, assetBalance: number) {
        this.assetData = assetData;
        this.assetBalance = assetBalance;
    }
}
