
export class NftDto {
    name?: string;
    description?: string;
    thumbnailImageBase64?: string;

    constructor(name: string, description: string, thumbnailImageBase64: string) {
        this.name = name;
        this.description = description;
        this.thumbnailImageBase64 = thumbnailImageBase64;
    }
}
