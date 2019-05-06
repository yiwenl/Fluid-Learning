// copy.frag

#define SHADER_NAME SIMPLE_TEXTURE

precision highp float;
varying vec2 vTextureCoord;
uniform sampler2D texture;

void main(void) {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    vec2 dir = vTextureCoord - .5;
    gl_FragColor = vec4(dir * 1.5, 0.0, 1.0);
}