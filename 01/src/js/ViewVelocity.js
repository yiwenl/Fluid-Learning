// ViewVelocity.js

import alfrid, { GL } from 'alfrid';
import Config from './Config';

import vs from 'shaders/vel.vert';
import fs from 'shaders/vel.frag';

class ViewVelocity extends alfrid.View {
	
	constructor() {
		super(vs, fs);
	}


	_init() {
		const { planeSize } = Config;
		const numArrows = 10;
		const yz = 0.3;
		this.mesh = alfrid.Geom.cube(1, yz, yz);


		const positions = [];
		const uvs = [];
		let x, y;
		let gap = planeSize / numArrows;

		for(let i=0; i<numArrows; i++) {
			for(let j=0; j<numArrows; j++) {
				x = -planeSize/2 + i * gap + gap/2;
				y = -planeSize/2 + j * gap + gap/2;

				positions.push([x, y])
				uvs.push([i/numArrows, j/numArrows])
			}
		}


		this.mesh.bufferInstance(positions, 'aPosOffset');
		this.mesh.bufferInstance(uvs, 'aUV');

		this.shader.bind();
		this.shader.uniform("color", "vec3", [1, 0, 0]);
		this.shader.uniform("opacity", "float", 1);
		this.shader.uniform("uScale", "float", Config.planeSize/numArrows * 0.5);
	}


	render(texture) {
		this.shader.bind();
		this.shader.uniform("texture", "uniform1i", 0);
		texture.bind(0);
		GL.draw(this.mesh);
	}


}

export default ViewVelocity;