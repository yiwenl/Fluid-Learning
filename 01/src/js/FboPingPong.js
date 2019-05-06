// FboPingPong.js

import alfrid, { FrameBuffer } from 'alfrid';

class FboPingPong {
	constructor(mWidth, mHeight, mParameters = {}) {
		const a = new FrameBuffer(mWidth, mHeight, mParameters);
		const b = new FrameBuffer(mWidth, mHeight, mParameters);

		this._fbos = [a, b];
	}


	get read() {
		return this._fbos[0];
	}


	get write() {
		return this._fbos[1];
	}

	get readTexture() {
		return this._fbos[0].getTexture();
	}


	get writeTexture() {
		return this._fbos[1].getTexture();
	}

	swap() {
		this._fbos.reverse();
	}
}

export default FboPingPong;