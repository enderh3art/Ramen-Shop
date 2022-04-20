uniform float progress;
uniform sampler2D texture1;
uniform sampler2D texture2;
varying vec2 vUv;

void main()	{
    vec4 t1 = texture2D(texture1,vUv);
    vec4 t2 = texture2D(texture2,vUv);
    gl_FragColor = mix(t1, t2, progress);
}