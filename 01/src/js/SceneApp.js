// SceneApp.js

import alfrid, { Scene, GL } from 'alfrid';
import Assets from './Assets';
import Config from './Config';
import GridTexture from './GridTexture';
import UVTexture from './UVTexture';
import ViewPlane from './ViewPlane';
import ViewVelocity from './ViewVelocity';

import FboPingPong from './FboPingPong';

import fsVel from 'shaders/velocity.frag';
import fsUpdate from 'shaders/update.frag';

class SceneApp extends Scene {
	constructor() {

		super();
		this.resize();
		GL.enableAlphaBlending();
		// this.orbitalControl.rx.value = this.orbitalControl.ry.value = 0.3;
		this.orbitalControl.radius.value = 5;

	}


	_initTextures() {
		console.log('init textures');

		this._textureGrid = new GridTexture();
		this._textureUV = new UVTexture();


		const fboSize = 512;
		const oParam = {
			type:GL.FLOAT, 
			minFilter:GL.LINEAR_MIPMAP_NEAREST, 
			magFilter:GL.LINEAR,
			wrapS:GL.REPEAT,
			wrapT:GL.REPEAT
		};
		this._fboVel = new FboPingPong(fboSize, fboSize, oParam);

		this._fboVel.read.bind();
		GL.clear(0, 0, 0, 1);
		this._fboVel.read.unbind();

		this._fboVel.write.bind();
		GL.clear(0, 0, 0, 1);
		this._fboVel.write.unbind();

		this._fboVel.read.showParameters();

		this._fboOutput = new FboPingPong(fboSize, fboSize, oParam);
	}


	_initViews() {
		console.log('init views');

		this._bCopy = new alfrid.BatchCopy();
		this._bAxis = new alfrid.BatchAxis();
		this._bDots = new alfrid.BatchDotsPlane();


		this._vPlane = new ViewPlane();
		this._vVelocity = new ViewVelocity();

		this.mesh = alfrid.Geom.bigTriangle();
		this.shaderVel = new alfrid.GLShader(alfrid.ShaderLibs.bigTriangleVert, fsVel);
		this.shaderUpdate = new alfrid.GLShader(alfrid.ShaderLibs.bigTriangleVert, fsUpdate);



		this._fboVel.read.bind();
		GL.clear(0, 0, 0, 1);
		this.shaderVel.bind();
		GL.draw(this.mesh);
		this._fboVel.read.unbind();

		this._fboOutput.read.bind();
		GL.clear(0, 0, 0, 1);
		this._bCopy.draw(this._textureGrid);
		this._fboOutput.read.unbind();
	}


	updateOutput() {
		
		this._fboOutput.write.bind();
		GL.clear(0, 0, 0, 1);
		this.shaderUpdate.bind();

		//	previous output
		this.shaderUpdate.uniform("texture", "uniform1i", 0);
		this._fboOutput.readTexture.bind(0);

		//	velocity map
		this.shaderUpdate.uniform("textureVel", "uniform1i", 1);
		this._fboVel.readTexture.bind(1);

		//	draw mesh
		GL.draw(this.mesh);

		this._fboOutput.write.unbind();

		//	swap
		this._fboOutput.swap();
	}

	render() {
		let s;
		GL.clear(0, 0, 0, 0);

		//	update velocity
		this._fboVel.write.bind();
		GL.clear(0, 0, 0, 1);
		this.shaderVel.bind();
		GL.draw(this.mesh);
		this._fboVel.write.unbind();
		this._fboVel.swap();


		//	update output
		this.updateOutput();

		this._vPlane.render(this._fboOutput.readTexture);
		this._vVelocity.render(this._fboVel.readTexture);

		s = 250;
		GL.viewport(0, 0, s, s);
		this._bCopy.draw(this._textureGrid);

		GL.viewport(s, 0, s, s);
		this._bCopy.draw(this._fboOutput.readTexture);

		GL.viewport(s*2, 0, s, s);
		this._bCopy.draw(this._fboVel.readTexture);

	}


	toResize(w, h) {
		const { innerWidth, innerHeight, devicePixelRatio } = window;
		w = w || innerWidth;
		h = h || innerHeight;
		GL.setSize(w, h);
		let tw = Math.min(w, innerWidth);
		let th = Math.min(h, innerHeight);

		const sx = innerWidth / w;
		const sy = innerHeight / h;
		const scale = Math.min(sx, sy);
		tw = w * scale;
		th = h * scale;

		GL.canvas.style.width = `${tw}px`;
		GL.canvas.style.height = `${th}px`;
		this.camera.setAspectRatio(GL.aspectRatio);
	}

	resize() {
		this.toResize(window.innerWidth, window.innerHeight);
	}
}


export default SceneApp;