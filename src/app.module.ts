import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OcrModule } from './ocr/ocr.module';
import { LlmModule } from './llm/llm.module';
import { TramitadorModule } from './tramitador/tramitador.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [OcrModule, LlmModule, TramitadorModule, UploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
