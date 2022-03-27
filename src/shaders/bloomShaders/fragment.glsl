uniform sampler2D baseTexture;
uniform sampler2D bloomTexture;

varying vec2 vUv;

vec4 LinearToGamma(in vec4 value, in float gammaFactor) {
  return vec4(pow(value.xyz, vec3(1.0 / gammaFactor)), value.w);
}

void main() {
 

    gl_FragColor = ( LinearToGamma(texture2D( baseTexture, vUv ),2.0) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );

}