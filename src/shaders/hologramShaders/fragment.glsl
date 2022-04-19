varying vec2 vUv;

uniform float uTime;
uniform float uBigGridThickness;
uniform float uLittleGridThickness;
uniform float uBigGridFrequency;
uniform float uLittleGridFrequency;
uniform float uSpeed;
uniform vec3 uColor;

void main()
{

    // Grid
    float dispacementX = smoothstep(0.0, 1.0, cos(sin(uTime) + + sin(uTime * 0.3)));
    float dispacementY = smoothstep(0.0, 1.0, cos(uTime + 3.0) + sin(uTime + 3.0));

    float bigGrid = step((1.0 - uBigGridThickness), mod((vUv.x + dispacementX * uSpeed)* uBigGridFrequency, 1.0)) ;
    bigGrid += step((1.0- uBigGridThickness), mod((vUv.y + dispacementY* uSpeed) * uBigGridFrequency, 1.0));

    float littleGrid = step((1.0- uLittleGridThickness), mod((vUv.x + dispacementX* uSpeed) * uLittleGridFrequency, 1.0));
    littleGrid += step((1.0- uLittleGridThickness), mod((vUv.y + dispacementY* uSpeed) * uLittleGridFrequency, 1.0));

    float strength = bigGrid + littleGrid;

    gl_FragColor = vec4(uColor, strength);
}