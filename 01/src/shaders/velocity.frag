// copy.frag

#define SHADER_NAME SIMPLE_TEXTURE

precision highp float;
varying vec2 vTextureCoord;
uniform sampler2D texture;


#define PI 3.141592653

void main(void) {
	float speed = 0.005;
    gl_FragColor = vec4(speed, 0.0, 0.0, 1.0);

    float x = sin(PI * 4.0 * vTextureCoord.y) * speed;
    float y = sin(PI * 4.0 * vTextureCoord.x) * speed;

    gl_FragColor = vec4(x, y, 0.0, 1.0);
}