import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { createWorker } from 'tesseract.js';
import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import OpenAI from 'openai';

export enum TranslationProvider {
  DEEPL = 'deepl',
  GPT = 'gpt'
}

@Injectable()
export class TranslationService {
  private readonly deeplApiKey: string;
  private readonly deeplApiUrl: string = 'https://api-free.deepl.com/v2/translate';
  private readonly openai: OpenAI;
  private activeProvider: TranslationProvider = TranslationProvider.GPT;
  
  constructor(private readonly httpService: HttpService) {
    // Initialize DeepL
    const deeplKey = process.env.DEEPL_API_KEY;
    if (!deeplKey) {
      throw new Error('DEEPL_API_KEY is not set in environment variables');
    }
    this.deeplApiKey = deeplKey;

    // Initialize OpenAI
    const openaiKey = process.env.OPENAI_API_KEY;
    if (!openaiKey) {
      throw new Error('OPENAI_API_KEY is not set in environment variaes');
    }
    this.openai = new OpenAI({
      apiKey: openaiKey,
    });
  }

  setActiveProvider(provider: TranslationProvider) {
    this.activeProvider = provider;
  }

  getActiveProvider(): TranslationProvider {
    return this.activeProvider;
  }

  async downloadImage(url: string): Promise<string> {
    const filename = path.basename(url);
    const filepath = path.join('uploads', filename);

    return new Promise((resolve, reject) => {
      https.get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download image: ${response.statusCode}`));
          return;
        }

        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);

        fileStream.on('finish', () => {
          fileStream.close();
          resolve(filepath);
        });

        fileStream.on('error', (err) => {
          fs.unlink(filepath, () => reject(err));
        });
      }).on('error', (err) => {
        reject(err);
      });
    });
  }

  async extractTextFromImage(imagePath: string): Promise<string> {
    const worker = await createWorker('jpn');
    try {
      const { data: { text } } = await worker.recognize(imagePath);
      return text;
    } finally {
      await worker.terminate();
    }
  }

  async translateWithDeepL(text: string, targetLang: string = 'VI'): Promise<string> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          this.deeplApiUrl,
          {
            text: [text],
            target_lang: targetLang,
            source_lang: 'JA'
          },
          {
            headers: {
              'Authorization': `DeepL-Auth-Key ${this.deeplApiKey}`,
              'Content-Type': 'application/json'
            }
          }
        )
      );

      return response.data.translations[0].text;
    } catch (error) {
      console.error('DeepL translation error:', error);
      throw new Error('Failed to translate text with DeepL');
    }
  }

  async translateWithGPT(text: string, targetLang: string = 'Vietnamese'): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo", // or "gpt-3.5-turbo" for GPT-3.5
        messages: [
          {
            role: "system",
            content: `You are a professional translator. Translate the following Japanese text to ${targetLang}. Keep the original meaning and context.`
          },
          {
            role: "user",
            content: text
          }
        ],
        temperature: 0.3,
        max_tokens: 1000
      });

      const content = response.choices[0].message.content;
      if (!content) {
        throw new Error('No translation content received from GPT');
      }
      return content;
    } catch (error) {
      console.error('GPT translation error:', error);
      throw new Error('Failed to translate text with GPT');
    }
  }

  async translateText(text: string, targetLang: string = 'VI'): Promise<string> {
    if (this.activeProvider === TranslationProvider.DEEPL) {
      return this.translateWithDeepL(text, targetLang);
    } else {
      return this.translateWithGPT(text, targetLang);
    }
  }

  async processImage(url: string): Promise<{ original: string; translated: string; provider: TranslationProvider }> {
    let imagePath: string | null = null;
    try {
      // Download image
      // imagePath = await this.downloadImage(url);
      imagePath = "uploads/chapters/1744296871804-510362735.png";
      
      // Extract text using OCR
      const originalText = await this.extractTextFromImage(imagePath);
      
      // Translate text
      const translatedText = await this.translateText(originalText);
      
      return {
        original: originalText,
        translated: translatedText,
        provider: this.activeProvider
      };
    } catch (error) {
      console.error('Process image error:', error);
      throw new Error('Failed to process image');
    } finally {
      // Clean up
      if (imagePath && fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
  }
}
