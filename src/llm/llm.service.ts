import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class LlmService {
  private readonly ollamaUrl = 'http://localhost:11434/api/generate';

  async queryModel(prompt: string, model = 'mistral'): Promise<string> {
    const response = await axios.post(this.ollamaUrl, {
      model,
      prompt,
      stream: false,
    });
    return response.data.response;
  }
}
