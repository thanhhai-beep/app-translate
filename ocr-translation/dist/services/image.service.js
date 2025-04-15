"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageService = void 0;
const axios_1 = require("axios");
const fs = require("fs");
const path = require("path");
const util_1 = require("util");
const uuid_1 = require("uuid");
const writeFileAsync = (0, util_1.promisify)(fs.writeFile);
const mkdirAsync = (0, util_1.promisify)(fs.mkdir);
class ImageService {
    uploadDir;
    constructor() {
        this.uploadDir = path.join(process.cwd(), 'uploads');
        this.ensureUploadDir();
    }
    async ensureUploadDir() {
        if (!fs.existsSync(this.uploadDir)) {
            await mkdirAsync(this.uploadDir, { recursive: true });
        }
    }
    async downloadAndSaveImage(imageUrl) {
        try {
            const response = await axios_1.default.get(imageUrl, { responseType: 'arraybuffer' });
            const ext = path.extname(imageUrl) || '.jpg';
            const filename = `${(0, uuid_1.v4)()}${ext}`;
            const filePath = path.join(this.uploadDir, filename);
            await writeFileAsync(filePath, response.data);
            return path.join('uploads', filename);
        }
        catch (error) {
            console.error('Error downloading image:', error);
            throw new Error('Failed to download and save image');
        }
    }
}
exports.ImageService = ImageService;
//# sourceMappingURL=image.service.js.map