const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

class ImageResizer {
  constructor(opts) {
    this.url = opts.url;
    this.originalWidth = opts.originalWidth;
    this.originalHeight = opts.originalHeight;
    this.width = opts.width;
    this.height = Math.floor(this.originalHeight * this.width / this.originalWidth);
    this.resamplingMethod = opts.resamplingMethod;
    this.message = opts.message;
    this.tempDir = path.join(__dirname, '..', 'temp');
    this.targetFile = path.join(this.tempDir, `rescaled_${Date.now()}${opts.id}.${opts.extension}`);
  }

  send(image) {
    return this.message.say('', {
      file: image
    });
  }

  error(str) {
    return this.message.say(`:x: ${str}`);
  }

  getImage() {
    return axios
      .get(this.url, { responseType: 'arraybuffer' })
      .then(response => response.data)
      .catch(err => {
        throw new Error(err);
      });
  }

  getSize(file) {
    const stat = fs.statSync(file);
    return stat.size;
  }

  async nearestNeighbor() {
    const buffer = await this.getImage();
    const target = this.targetFile;

    return sharp(buffer)
      .resize(this.width, this.height, {
        kernel: sharp.kernel.nearest,
        centerSampling: true
      })
      .toFile(target)
      .then(function () {
        return target;
      })
      .catch(function (err) {
        throw new Error(err);
      });
  }

  cleanup(src) {
    return fs.unlinkSync(src);
  }

  async rescaleImage() {
    try {
      switch (this.resamplingMethod) {
        case 'nearest':
          return await this.nearestNeighbor();
        default:
          return null;
      }
    } catch (err) {
      console.error(err);
      return this.message.say(':x: Failed to rescale the image.');
    }
  }

  async init() {
    if (!this.width || !this.height) {
      return this.error('Please provide a valid image.');
    }

    if (this.width > 10000) {
      return this.error('The provided value is too large.');
    }

    try {
      const rescaled = await this.rescaleImage();
      console.log(this.url);
      const size = this.getSize(rescaled);

      if (size > 8e6) {
        this.cleanup(rescaled);
        return this.error('The generated file is too big to upload it to Discord.');
      }

      await this.send(rescaled);
      this.cleanup(rescaled);
    } catch (err) {
      return null;
    }
  }
};

module.exports = ImageResizer;
