import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TramitadorService } from './tramitador.service';
import { diskStorage } from 'multer';
import * as path from 'path';

@Controller('tramite')
export class TramitadorController {
  constructor(private readonly tramitadorService: TramitadorService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const ext = path.extname(file.originalname);
          const name = path.basename(file.originalname, ext);
          cb(null, `${name}-${Date.now()}${ext}`);
        },
      }),
    }),
  )
  async handleTramite(
    @UploadedFile() file: Express.Multer.File,
    @Body('pregunta') pregunta: string,
  ) {
    const respuesta = await this.tramitadorService.procesarTramite(
      file.path,
      pregunta,
    );
    return { respuesta };
  }
}
