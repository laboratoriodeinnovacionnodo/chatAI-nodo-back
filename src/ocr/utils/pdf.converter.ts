import * as path from 'path';
import * as fs from 'fs';
import { convert } from 'pdf-poppler';

export class PdfConverter {
  static async convertPDFToImages(filePath: string): Promise<string[]> {
    const outputDir = path.join(__dirname, 'temp');
    fs.mkdirSync(outputDir, { recursive: true });

    await convert(filePath, {
      format: 'jpeg',
      out_dir: outputDir,
      out_prefix: 'page',
      page: null,
    });

    return fs.readdirSync(outputDir)
      .filter(f => f.endsWith('.jpg'))
      .map(f => path.join(outputDir, f));
  }
}
