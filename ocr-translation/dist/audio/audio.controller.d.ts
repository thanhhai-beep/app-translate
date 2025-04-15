import { AudioService } from './audio.service';
export declare class AudioController {
    private readonly audioService;
    constructor(audioService: AudioService);
    generateAudio(text: string): Promise<{
        message: string;
        path: string;
    }>;
}
