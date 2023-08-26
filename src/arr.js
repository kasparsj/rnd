import * as noiseLib from "./noise";
import * as rnd from "rnd";

const noise = (width, height, options = {}) => {
    options = Object.assign({
        type: 'improved',
        scale: 1.0,
    }, options);
    const data = new Uint8Array(width * height);
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const n = (noiseLib[options.type].get2(i, j, options.scale) + 1.0) / 2.0;
            data[i * width + j] = Math.round(n * 255);
        }
    }
    data.width = width;
    data.height = height;
    return data;
}

const random = (width, height, options = {}) => {
    const data = new Uint8Array(width * height);
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const n = Math.round(rnd.num() * 255);
            data[i * width + j] = n;
        }
    }
    data.width = width;
    data.height = height;
    return data;
}

const image = (url) => {
    const data = new Uint8Array();
    tx.load(url, (texture) => {
        const image = texture.image;
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);
        const imageData = ctx.getImageData(0, 0, image.width, image.height);
        data.set(imageData.data.buffer);
        data.width = image.width;
        data.height = image.height;
    });
    return data;
}

window.arr = { noise, random, image };

export { noise, random, image };