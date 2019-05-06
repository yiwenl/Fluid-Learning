// ViewPlane.js

import alfrid, { GL } from 'alfrid';
import fs from 'shaders/plane.frag';

class ViewPlane extends alfrid.View {
	
	constructor() {
		super(null, fs);
	}


	_init() {
		const s = 2;
		this.mesh = alfrid.Geom.plane(s, s, 1);
	}


	render(texture, textureUV) {
		this.shader.bind();
		this.shader.uniform("texture", "uniform1i", 0);
		texture.bind(0);
		// this.shader.uniform("textureUV", "uniform1i", 1);
		// textureUV.bind(1);
		GL.draw(this.mesh);
	}


}

export default ViewPlane;