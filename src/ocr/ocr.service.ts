import { Injectable } from '@nestjs/common';
import Tesseract from 'tesseract.js';
import * as path from 'path';
import * as fs from 'fs';
import * as mammoth from 'mammoth';
import * as xlsx from 'xlsx';
import { PdfConverter } from './utils/pdf.converter';

@Injectable()
export class OcrService {
  async extractText(filePath: string): Promise<string> {
    const ext = path.extname(filePath).toLowerCase();

    // Detectar tipo por extensión (más estable que file-type para este caso)
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
      return this.extractTextFromImage(filePath);
    }

    if (ext === '.pdf') {
      return this.extractTextFromPDF(filePath);
    }

    if (ext === '.docx') {
      return this.extractTextFromDocx(filePath);
    }

    if (ext === '.xlsx' || ext === '.xls') {
      return this.extractTextFromExcel(filePath);
    }

    return 'Tipo de archivo no compatible.';
  }

  // OCR de imagenes
  public async extractTextFromImage(filePath: string): Promise<string> {
    const { data: { text } } = await Tesseract.recognize(
      path.resolve(filePath),
      'spa', // idioma español
      {
        logger: m => console.log(m),
      }
    );
    return text;
  }

  // Leer texto de archivo Word (.docx)
  private async extractTextFromDocx(filePath: string): Promise<string> {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  }

  // Leer celdas de Excel (.xlsx)
  private async extractTextFromExcel(filePath: string): Promise<string> {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return xlsx.utils.sheet_to_csv(sheet); // texto plano
  }

  // Extraer texto desde PDF (conversión a imagen + OCR)
  private async extractTextFromPDF(filePath: string): Promise<string> {
    const images = await PdfConverter.convertPDFToImages(filePath);
    let fullText = '';

    for (const imagePath of images) {
      const text = await this.extractTextFromImage(imagePath);
      fullText += text + '\n';
      fs.unlinkSync(imagePath); // limpia imagen temporal
    }

    return fullText;
  }
}
