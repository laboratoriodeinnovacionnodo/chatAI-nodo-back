import { Injectable } from '@nestjs/common';
import { OcrService } from 'src/ocr/ocr.service';
import { LlmService } from 'src/llm/llm.service';

@Injectable()
export class TramitadorService {
  constructor(
    private readonly ocrService: OcrService,
    private readonly llmService: LlmService,
  ) {}

    async procesarTramite(filePath: string, pregunta: string): Promise<string> {
        const textoExtraido = await this.ocrService.extractText(filePath);

        const prompt = `
        Texto extraído del documento:
        ${textoExtraido}

        Pregunta:
        ${pregunta}

        Responde de forma clara y en español.
        `;

        const respuesta = await this.llmService.queryModel(prompt);
        return respuesta;
    }

}
