// GridTexture.js

import alfrid from 'alfrid';

const createGridCanvas = (mSize=1024, mGrid=10) => {
	const canvas = document.createElement("canvas");

	canvas.width = mSize;
	canvas.height = mSize;
	const ctx = canvas.getContext('2d');

	const gap = mSize / mGrid;
	let x, y;

	for(let i=0; i<mGrid; i++) {
		for(let j=0; j<mGrid; j++) {
			let t = i%2 + j % 2;

			let color = t % 2 == 0 ? 'white' : 'black';
			x = i * gap;
			y = j * gap;

			ctx.fillStyle = color;
			ctx.fillRect(x, y, gap, gap);
			ctx.fill();
		}
	}


	return canvas;

}


class GridTexture extends alfrid.GLTexture {
	constructor() {
		const canvas = createGridCanvas();
		super(canvas);
	}
}


export default GridTexture;