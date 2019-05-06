// copy.frag

#define SHADER_NAME SIMPLE_TEXTURE

precision highp float;
varying vec2 vTextureCoord;
uniform sampler2D texture;
uniform sampler2D textureVel;

void main(void) {
	vec2 vel = texture2D(textureVel, vTextureCoord).xy;
	// vec2 uv = mod(vTextureCoord - vel, vec2(1.0));
	vec2 uv = fract(vTextureCoord - vel);

    gl_FragColor = texture2D(texture, uv);
    // gl_FragColor = vec4(vel * 10.0, 0.0, 1.0);
    // gl_FragColor = vec4(uv, 0.0, 1.0);
}