// copy.frag

#define SHADER_NAME SIMPLE_TEXTURE

precision highp float;
varying vec2 vTextureCoord;
uniform sampler2D texture;
uniform sampler2D textureVel;

void main(void) {
	// vec2 uv = texture2D(textureUV, vTextureCoord).xy;
    gl_FragColor = texture2D(texture, vTextureCoord);
}