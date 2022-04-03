uniform vec3 keyColor;
uniform float similarity;
uniform float smoothness;
varying vec2 vUv;
uniform sampler2D map;

vec4 LinearToGamma(in vec4 value, in float gammaFactor) {
  return vec4(pow(value.xyz, vec3(1.0 / gammaFactor)), value.w);
}

void main() {

    vec4 videoColor = texture2D(map, vUv);

    float Y1 = 0.299 * keyColor.r + 0.587 * keyColor.g + 0.114 * keyColor.b;
    float Cr1 = keyColor.r - Y1;
    float Cb1 = keyColor.b - Y1;

    float Y2 = 0.299 * videoColor.r + 0.587 * videoColor.g + 0.114 * videoColor.b;
    float Cr2 = videoColor.r - Y2;
    float Cb2 = videoColor.b - Y2;

    float blend = smoothstep(similarity, similarity + smoothness, distance(vec2(Cr2, Cb2), vec2(Cr1, Cb1)));
    gl_FragColor = LinearToGamma(vec4(videoColor.rgb, videoColor.a * blend),0.5);
}