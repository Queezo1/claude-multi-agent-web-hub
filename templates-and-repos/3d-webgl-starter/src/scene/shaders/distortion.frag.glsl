uniform sampler2D uTexture;
uniform vec2 uMouse;       // Mausposition in UV-Space (0..1)
uniform float uVelocity;   // Mausgeschwindigkeit, treibt Distortion-Intensitaet
uniform float uTime;

varying vec2 vUv;

// Einfache, selbst geschriebene Distortion im Lusion-Stil: Verzerrung nimmt
// mit der Naehe zum Cursor und der Mausgeschwindigkeit zu, klingt danach
// weich ab (kein hartes On/Off).
void main() {
  vec2 uv = vUv;
  float dist = distance(uv, uMouse);
  float falloff = smoothstep(0.35, 0.0, dist);

  vec2 direction = normalize(uv - uMouse + 1e-4);
  uv += direction * falloff * uVelocity * 0.04;

  vec4 color = texture2D(uTexture, uv);
  gl_FragColor = color;
}
