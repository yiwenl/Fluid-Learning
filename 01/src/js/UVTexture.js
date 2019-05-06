// UVTexture.js

import alfrid from 'alfrid';

const createCanvas = (mSize=1024) => {
	const canvas = document.createElement("canvas");
	canvas.width = mSize;
	canvas.height = mSize;
	const ctx = canvas.getContext('2d');

	const imgData = ctx.getImageData(0, 0, mSize, mSize);
	const pixels = imgData.data;

	let index;
	for(let i=0; i<mSize; i++) {
		for(let j=0; j<mSize; j++) {
			index = (i + j * mSize) * 4;
			pixels[index] = Math.floor(i/mSize * 255);
			pixels[index+1] = 255 - Math.floor(j/mSize * 255);
			pixels[index+2] = 0;
			pixels[index+3] = 255;
		}
	}

	window.ctx = ctx;
	ctx.putImageData(imgData, 0, 0);

	return canvas;
}


class UVTexture extends alfrid.GLTexture {
	constructor() {
		const canvas = createCanvas();
		super(canvas);
	}
}


export default UVTexture;