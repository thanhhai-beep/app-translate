// audio.service.ts
import { Injectable } from '@nestjs/common';
import * as path from 'path';
const gTTS = require('gtts');

@Injectable()
export class AudioService {
  async textToAudio(text: string, lang = 'vi'): Promise<string> {
    const filename = `audio_${Date.now()}.mp3`;
    const filepath = path.join('uploads', filename);

    return new Promise((resolve, reject) => {
      const gtts = new gTTS(text, lang);
      gtts.save(filepath, (err: any) => {
        if (err) return reject(err);
        resolve(filepath);
      });
    });
  }
}
