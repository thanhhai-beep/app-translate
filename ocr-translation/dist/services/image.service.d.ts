export declare class ImageService {
    private readonly uploadDir;
    constructor();
    private ensureUploadDir;
    downloadAndSaveImage(imageUrl: string): Promise<string>;
}
