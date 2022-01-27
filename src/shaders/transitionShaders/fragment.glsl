uniform float progress;
uniform float intensity;
uniform sampler2D texture1;
uniform sampler2D texture2;
varying vec2 vUv;

mat2 rotate(float a) {
    float s = sin(a);
    float c = cos(a);
    return mat2(c, -s, s, c);
}

void main()	{
    
    // vec2 uvDivided = fract(vUv*vec2(intensity,1.));
    // vec2 uvDisplaced1 = vUv + rotate(3.1415926/4.)*uvDivided*progress*0.1;
    // vec2 uvDisplaced2 = vUv + rotate(3.1415926/4.)*uvDivided*(1. - progress)*0.1;
    // vec4 t1 = texture2D(texture1,uvDisplaced1);
    // vec4 t2 = texture2D(texture2,uvDisplaced2);

    vec4 t1 = texture2D(texture1,vUv);
    vec4 t2 = texture2D(texture2,vUv);
    gl_FragColor = mix(t1, t2, progress);
}