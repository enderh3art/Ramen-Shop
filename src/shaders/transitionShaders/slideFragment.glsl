uniform float progress;
uniform float intensity;
uniform sampler2D texture1;
uniform sampler2D texture2;
varying vec2 vUv;


void main() {
  vec4 t1 = texture2D(texture1,vUv);
  vec4 t2 = texture2D(texture2,vUv);

  vec2 p = vUv + progress * vec2(1.0, 0.0);

  gl_FragColor= mix(
    t2,
    t1,
    step(0.0, p.y) * step(p.y, 1.0) * step(0.0, p.x) * step(p.x, 1.0)
  );
}