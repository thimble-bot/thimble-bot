import sharp from 'sharp';
import axios from 'axios';

type ResamplingMethod = 'nearest';

export interface ImageResizerOpts {
  id: string;
  url: string;
  originalWidth: number | null;
  originalHeight: number | null;
  width?: number;
  resamplingMethod: ResamplingMethod;
  extension: string;
}

class ImageResizer {
  private url: string;
  private originalWidth: number | null;
  private originalHeight: number | null;
  private width?: number;
  private height?: number | null;
  private resamplingMethod: ResamplingMethod;

  private filename: string;

  constructor(opts: ImageResizerOpts) {
    this.url = opts.url;
    this.originalHeight = opts.originalHeight;
    this.originalWidth = opts.originalWidth;
    this.width = opts.width;
    this.height = this.width && this.originalHeight && this.originalWidth
      && Math.floor(this.originalHeight * this.width / this.originalWidth);
    this.resamplingMethod = opts.resamplingMethod;

    this.filename = `rescaled_${Date.now()}${opts.id}.${opts.extension}`;
  }

  private async getImage(): Promise<Buffer> {
    const { data } = await axios.get(this.url, { responseType: 'arraybuffer' });
    return data;
  }

  private getSize(buffer: Buffer): number {
    return Buffer.byteLength(buffer);
  }

  private async nearest(): Promise<Buffer> {
    const buffer = await this.getImage();

    const output = await sharp(buffer)
      .resize(this.width, this.height, {
        kernel: sharp.kernel.nearest
      })
      .toBuffer();

    return output;
  }

  private async rescale() {
    switch (this.resamplingMethod) {
      case 'nearest':
        return this.nearest();
      default:
        return null;
    }
  }

  async resize(): Promise<Buffer> {
    if (!this.width || !this.height) {
      throw new Error('Please provide a valid image.');
    }

    if (this.width > 10000) {
      throw new Error('The provided image must not exceed 10000 pixels in width.');
    }

    const rescaled = await this.rescale();

    if (!rescaled) {
      throw new Error('Failed to rescale image.');
    }

    const size = this.getSize(rescaled);

    if (size > 8e6) {
      throw new Error('The generated file is too big to upload it to Discord.');
    }

    return rescaled;
  }

  public getFilename(): string {
    return this.filename;
  }
}

export default ImageResizer;
