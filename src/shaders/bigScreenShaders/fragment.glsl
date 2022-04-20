#define PI 3.1415926535897932384626433832795

varying vec2 vUv;

uniform float uTime;
uniform float uXOffset;
uniform float uYOffset;
uniform float uRadialThickness;
uniform float uSpeed;
uniform vec3 uLightColor;
uniform vec3 uDarkColor;
uniform sampler2D uTexture;

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

    vec3 blackColor = vec3(0.0);
    vec3 uvColor = vec3(vUv, 0.5);

    vec3 mixedColor = mix(uLightColor, uDarkColor, strength);

    vec2 vUvFlipped = vec2(vUv.x, vUv.y);

    vec4 textureColor = texture2D(uTexture, vUvFlipped);

    vec3 compositedColor = mix(mixedColor,textureColor.xyz, textureColor.a);

    gl_FragColor = vec4(compositedColor, 1.0);
}