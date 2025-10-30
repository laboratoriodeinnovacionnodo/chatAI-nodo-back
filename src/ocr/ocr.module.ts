import { Module } from '@nestjs/common';
import { OcrService } from './ocr.service';

@Module({
  providers: [OcrService],
  exports: [OcrService], // 👈 Esto es clave para compartirlo con otros módulos
})
export class OcrModule {}
