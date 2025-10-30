import { Module } from '@nestjs/common';
import { TramitadorService } from './tramitador.service';
import { TramitadorController } from './tramitador.controller';
import { OcrModule } from '../ocr/ocr.module';
import { LlmModule } from '../llm/llm.module';

@Module({
  imports: [OcrModule, LlmModule], // 👈 IMPORTANTE
  controllers: [TramitadorController],
  providers: [TramitadorService],
})
export class TramitadorModule {}
