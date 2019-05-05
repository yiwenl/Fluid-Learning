// ViewPlane.js

import alfrid, { GL } from 'alfrid';

class ViewPlane extends alfrid.View {
	
	constructor() {
		super(null, alfrid.ShaderLibs.copyFrag);
	}


	_init() {
		const s = 2;
		this.mesh = alfrid.Geom.plane(s, s, 1);
	}


	render(texture) {
		this.shader.bind();
		this.shader.uniform("texture", "uniform1i", 0);
		texture.bind(0);
		GL.draw(this.mesh);
	}


}

export default ViewPlane;