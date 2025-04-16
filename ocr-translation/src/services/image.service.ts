import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { v4 as uuidv4 } from 'uuid';

const writeFileAsync = promisify(fs.writeFile);
const mkdirAsync = promisify(fs.mkdir);

export class ImageService {
  private readonly uploadDir: string;

  constructor() {
    this.uploadDir = path.join(process.cwd(), 'uploads');
    this.ensureUploadDir();
  }

  private async ensureUploadDir() {
    if (!fs.existsSync(this.uploadDir)) {
      await mkdirAsync(this.uploadDir, { recursive: true });
    }
  }

  async downloadAndSaveImage(imageUrl: string): Promise<string> {
    try {
      const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      
      const ext = path.extname(imageUrl) || '.jpg';
      const filename = `${uuidv4()}${ext}`;
      const filePath = path.join(this.uploadDir, filename);

      await writeFileAsync(filePath, response.data);

      return path.join('uploads', filename);
    } catch (error) {
      console.error('Error downloading image:', error);
      throw new Error('Failed to download and save image');
    }
  }
} 