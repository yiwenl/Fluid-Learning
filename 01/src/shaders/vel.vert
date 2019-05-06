// basic.vert

precision highp float;
attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec3 aNormal;
attribute vec2 aPosOffset;
attribute vec2 aUV;

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform float uScale;

uniform sampler2D texture;

varying vec2 vTextureCoord;
varying vec3 vNormal;
varying vec3 vDebug;

vec2 rotate(vec2 v, float a) {
	float s = sin(a);
	float c = cos(a);
	mat2 m = mat2(c, -s, s, c);
	return m * v;
}

void main(void) {
	float s       = 1.0 - (aVertexPosition.x + 0.5);
	vec3 pos      = aVertexPosition * uScale;
	pos.yz        *= s;
	
	vec2 vel      = texture2D(texture, aUV).xy;
	
	
	vec2 dir      = normalize(vel);
	float theta   = atan(-dir.y, dir.x);
	pos.xy        = rotate(pos.xy, theta);
	pos.z         += 0.02;
	float speed   = length(vel) * 100.0;
	pos           *= min(speed, 2.0);
	
	pos.xy        += aPosOffset;
	gl_Position   = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(pos, 1.0);
	vTextureCoord = aTextureCoord;
	vNormal       = aNormal;
	// vDebug        = vec3(aUV, 0.0);
	// vDebug        = vec3(vel, 0.0);
	vDebug        = vec3(1.0, 0.0, 0.0);
}