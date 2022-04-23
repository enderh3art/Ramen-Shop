#define PI 3.1415926535897932384626433832795

varying vec2 vUv;

uniform float uTime;
uniform float uXOffset;
uniform float uYOffset;
uniform float uRadialThickness;
uniform float uSpeed;
uniform vec3 uLightColor;
uniform vec3 uDarkColor;
uniform sampler2D uDefaultTexture;

uniform float uProgress;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform float uTexture1IsDefault;
uniform float uTexture2IsDefault;

vec2 rotate(vec2 uv, float rotation, vec2 mid)
{
    return vec2(
      cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
      cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}
void main()
{
    vec2 rotatedUV = rotate(vUv, -uTime * uSpeed, vec2(uXOffset, uYOffset));
    float angle = atan(rotatedUV.x - uXOffset, rotatedUV.y - uYOffset) / (PI * uRadialThickness);
    float strength = step(0.5,mod(angle * 20.0, 1.0));
    vec3 mixedColor = mix(uLightColor, uDarkColor, strength);
    vec4 textureColor = texture2D(uDefaultTexture, vUv);
    vec3 bigScreenDefault = mix(mixedColor,textureColor.xyz, textureColor.a);

    vec4 t1 = texture2D(uTexture1,vUv);
    vec4 t2 = texture2D(uTexture2,vUv);

    // gl_FragColor = vec4(bigScreenDefault, 1.0);
    
    gl_FragColor = mix(
      vec4((vec3(uTexture1IsDefault) * bigScreenDefault),1.0) + vec4((1.0 - uTexture1IsDefault)) * t1,
      vec4((vec3(uTexture2IsDefault) * bigScreenDefault),1.0) + vec4((1.0 - uTexture2IsDefault)) * t2,
      uProgress);


}