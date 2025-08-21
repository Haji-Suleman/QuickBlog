import { GoogleGenAI } from '@google/genai';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AiService {
    private ai: GoogleGenAI;

    constructor(private readonly configService: ConfigService) {
        const gemini_key = this.configService.get<string>("GEMINI_API_KEY")
        if (typeof gemini_key === "string") {

            this.ai = new GoogleGenAI({ apiKey: gemini_key }); // API key from env
        }
    }

    async main(prompt): Promise<string | undefined> {
        const response = await this.ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        return response.text;
    }
}