import { useEffect, useRef } from "react";

const VERTEX_SHADER = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;
uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_mouse;

#define PI 3.14159265359
#define TAU 6.28318530718
#define NUM_LAYERS 4
#define ITERATIONS 3
#define NOISE_SCALE 1.0
#define TIME_SCALE 0.03

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < ITERATIONS; i++) {
    v += a * noise(p);
    p = rot * p * 2.0;
    a *= 0.5;
  }
  return v;
}

float warp(vec2 p, float t) {
  vec2 q = vec2(
    fbm(p + t),
    fbm(p + vec2(5.2, 1.3) + t * 0.5)
  );
  return fbm(p + q);
}

vec3 multiLayeredFluid(vec2 uv, float t, float mx, float my) {
  vec3 col = vec3(0.0);
  float totalWeight = 0.0;
  vec2 mouseOffset = vec2(mx, my) * 0.1;

  for (int i = 0; i < NUM_LAYERS; i++) {
    float fi = float(i);
    float scale = NOISE_SCALE + fi * 0.5;
    float timeOffset = t * (TIME_SCALE + fi * 0.01);
    vec2 p = uv * scale + timeOffset;
    p += mouseOffset * (1.0 + fi * 0.3);
    float warped = warp(p, timeOffset);
    float layer = smoothstep(0.2, 0.8, warped) * smoothstep(0.8, 0.2, warped);

    vec3 layerColor;
    if (i == 0) layerColor = vec3(0.0, 0.7, 1.0);
    else if (i == 1) layerColor = vec3(0.4, 0.0, 0.6);
    else if (i == 2) layerColor = vec3(0.0, 0.2, 0.9);
    else layerColor = vec3(0.0, 0.9, 0.7);

    float weight = 1.0 / (1.0 + fi * 0.5);
    col += layerColor * layer * weight;
    totalWeight += weight;
  }
  return col / max(totalWeight, 0.001);
}

vec3 addHighlights(vec3 col, vec2 uv, float t, float mx, float my) {
  vec2 mouseOffset = vec2(mx, my) * 0.15;
  vec2 p = uv * 2.0 + t * 0.02 + mouseOffset;
  float highlights = smoothstep(0.6, 1.0, fbm(p));
  vec3 highlightColor = vec3(0.5, 1.0, 1.0);
  return col + highlightColor * highlights * 0.4;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - u_res * 0.5) / min(u_res.x, u_res.y);
  float aspectRatio = u_res.x / u_res.y;

  float mx = u_mouse.x;
  float my = u_mouse.y;

  if (u_mouse.x >= 0.0) {
    vec2 mUV = (u_mouse - u_res * 0.5) / min(u_res.x, u_res.y);
    mx = mUV.x;
    my = mUV.y;
  }

  float t = u_time;
  vec3 col = multiLayeredFluid(uv, t, mx, my);
  col = addHighlights(col, uv, t, mx, my);
  col *= smoothstep(1.2, 0.3, length(uv * vec2(1.0, aspectRatio)));
  col = pow(col, vec3(1.5));
  gl_FragColor = vec4(col, 1.0);
}
`;

export default function BioluminescentFluid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1, y: -1 });
  const smoothMouseRef = useRef({ x: -1, y: -1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      premultipliedAlpha: false,
    });
    if (!gl) return;
    glRef.current = gl;

    // Compile shaders
    const vs = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vs, VERTEX_SHADER);
    gl.compileShader(vs);

    const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fs, FRAGMENT_SHADER);
    gl.compileShader(fs);

    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
      console.error("Fragment shader error:", gl.getShaderInfoLog(fs));
    }

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);
    programRef.current = program;

    // Full-screen quad
    const verts = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const uTime = gl.getUniformLocation(program, "u_time");
    const uRes = gl.getUniformLocation(program, "u_res");
    const uMouse = gl.getUniformLocation(program, "u_mouse");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const onMouseMove = (e: MouseEvent) => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      mouseRef.current = {
        x: e.clientX * dpr,
        y: (canvas.clientHeight - e.clientY) * dpr,
      };
    };

    const render = () => {
      const time = performance.now() * 0.001;

      // Smooth mouse
      if (mouseRef.current.x >= 0) {
        if (smoothMouseRef.current.x < 0) {
          smoothMouseRef.current = { ...mouseRef.current };
        }
        smoothMouseRef.current.x +=
          (mouseRef.current.x - smoothMouseRef.current.x) * 0.05;
        smoothMouseRef.current.y +=
          (mouseRef.current.y - smoothMouseRef.current.y) * 0.05;
      }

      gl.uniform1f(uTime, time);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(
        uMouse,
        smoothMouseRef.current.x,
        smoothMouseRef.current.y
      );
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    />
  );
}
