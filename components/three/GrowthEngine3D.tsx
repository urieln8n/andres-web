"use client";

// Motor de crecimiento 3D: capa WebGL fija detrás de la portada que reacciona al scroll y al ratón.
// Es decorativa (aria-hidden): todo el contenido sigue en HTML para buscadores e IA.
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

type Clave = { p: number; x: number; y: number; z: number; escala: number; explota: number; giro: number; abre: number; brillo: number; vis: number };

// Escenas a lo largo de la página (p = progreso de scroll 0..1)
const CLAVES: Clave[] = [
  { p: 0.0, x: 2.35, y: 0.05, z: 0, escala: 1.0, explota: 0.0, giro: 0, abre: 0.0, brillo: 1.0, vis: 1 },
  { p: 0.06, x: 2.6, y: 0.2, z: -1.6, escala: 0.9, explota: 0.55, giro: 1.2, abre: 0.25, brillo: 1.0, vis: 0.6 },
  { p: 0.2, x: -3.3, y: 0.1, z: -2.5, escala: 0.8, explota: 0.15, giro: 2.4, abre: 0.4, brillo: 0.85, vis: 0.32 },
  { p: 0.36, x: 3.3, y: 0.25, z: -3.2, escala: 0.8, explota: 0.9, giro: 3.6, abre: 1.0, brillo: 0.9, vis: 0.32 },
  { p: 0.55, x: -3.3, y: 0.0, z: -2.5, escala: 0.8, explota: 0.25, giro: 4.8, abre: 0.5, brillo: 0.85, vis: 0.3 },
  { p: 0.75, x: 3.3, y: 0.1, z: -2.5, escala: 0.8, explota: 0.5, giro: 6.0, abre: 0.6, brillo: 0.9, vis: 0.3 },
  { p: 0.9, x: 0.0, y: -0.2, z: -2.4, escala: 0.9, explota: 0.0, giro: 7.0, abre: 0.0, brillo: 1.1, vis: 0.4 },
  { p: 1.0, x: 0.0, y: -0.4, z: -2.4, escala: 0.9, explota: 0.0, giro: 7.4, abre: 0.0, brillo: 1.1, vis: 0.35 },
];
const MOVIL_X = 0.25; // en móvil el objeto va a la esquina superior y más discreto

const MODULOS = [
  { texto: "Web 3D", color: "#C6FF3D" },
  { texto: "IA", color: "#C6FF3D" },
  { texto: "AEO", color: "#C6FF3D" },
  { texto: "SEO", color: "#C6FF3D" },
  { texto: "WhatsApp", color: "#34D399" },
  { texto: "CRM", color: "#A78BFA" },
];

const suave = (t: number) => t * t * (3 - 2 * t);
function interpolar(p: number): Clave {
  let i = 0;
  while (i < CLAVES.length - 2 && p > CLAVES[i + 1].p) i++;
  const a = CLAVES[i], b = CLAVES[i + 1];
  const t = suave(Math.min(1, Math.max(0, (p - a.p) / (b.p - a.p))));
  const mezcla = (k: keyof Clave) => a[k] + (b[k] - a[k]) * t;
  return { p, x: mezcla("x"), y: mezcla("y"), z: mezcla("z"), escala: mezcla("escala"), explota: mezcla("explota"), giro: mezcla("giro"), abre: mezcla("abre"), brillo: mezcla("brillo"), vis: mezcla("vis") };
}

function etiqueta(texto: string, color: string) {
  const c = document.createElement("canvas");
  c.width = 512; c.height = 160;
  const g = c.getContext("2d")!;
  g.fillStyle = "rgba(8,8,8,.78)";
  g.strokeStyle = color; g.lineWidth = 4;
  g.beginPath(); g.roundRect(6, 6, 500, 148, 74); g.fill(); g.stroke();
  g.fillStyle = color; g.beginPath(); g.arc(80, 80, 16, 0, Math.PI * 2); g.fill();
  g.font = "600 64px system-ui, -apple-system, Segoe UI, sans-serif";
  g.fillStyle = "#F8FAFC"; g.textBaseline = "middle"; g.fillText(texto, 120, 84);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

// Núcleo facetado: cada triángulo puede separarse del centro (uExplota) en el shader
function crearNucleo() {
  const base = new THREE.IcosahedronGeometry(1.15, 2).toNonIndexed();
  const pos = base.getAttribute("position");
  const centros = new Float32Array(pos.count * 3);
  const azar = new Float32Array(pos.count);
  for (let i = 0; i < pos.count; i += 3) {
    const cx = (pos.getX(i) + pos.getX(i + 1) + pos.getX(i + 2)) / 3;
    const cy = (pos.getY(i) + pos.getY(i + 1) + pos.getY(i + 2)) / 3;
    const cz = (pos.getZ(i) + pos.getZ(i + 1) + pos.getZ(i + 2)) / 3;
    const r = 0.4 + Math.random() * 1.2;
    for (let k = 0; k < 3; k++) { centros.set([cx, cy, cz], (i + k) * 3); azar[i + k] = r; }
  }
  base.setAttribute("aCentro", new THREE.BufferAttribute(centros, 3));
  base.setAttribute("aAzar", new THREE.BufferAttribute(azar, 1));
  base.computeVertexNormals();

  const uniforms = { uExplota: { value: 0 }, uTiempo: { value: 0 } };
  const material = new THREE.MeshPhysicalMaterial({
    color: "#2a2a2a", metalness: 1, roughness: 0.14, clearcoat: 1, clearcoatRoughness: 0.1,
    iridescence: 0.25, iridescenceIOR: 1.4, flatShading: true, side: THREE.DoubleSide,
  });
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uExplota = uniforms.uExplota;
    shader.uniforms.uTiempo = uniforms.uTiempo;
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nattribute vec3 aCentro;\nattribute float aAzar;\nuniform float uExplota;\nuniform float uTiempo;")
      .replace("#include <begin_vertex>", `#include <begin_vertex>
        vec3 dir = normalize(aCentro);
        float onda = sin(uTiempo * 1.3 + aAzar * 6.2831) * 0.03;
        transformed = aCentro + (transformed - aCentro) * (1.0 - uExplota * 0.35) + dir * (uExplota * aAzar * 1.1 + onda);`);
  };
  const malla = new THREE.Mesh(base, material);
  return { malla, uniforms };
}

export default function GrowthEngine3D() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const contenedor = ref.current;
    if (!contenedor) return;
    const movil = window.matchMedia("(max-width: 900px)").matches;
    const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: !movil, alpha: true, powerPreference: "high-performance" });
    } catch {
      return; // sin WebGL: la portada sigue funcionando con su fondo CSS
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, movil ? 1.5 : 1.75));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.92;
    renderer.setClearColor(0x000000, 0);
    contenedor.appendChild(renderer.domElement);

    const escena = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    escena.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    const camara = new THREE.PerspectiveCamera(movil ? 52 : 38, window.innerWidth / window.innerHeight, 0.1, 100);
    camara.position.set(0, 0, 9);

    // Luces
    escena.add(new THREE.AmbientLight("#202020", 0.6));
    const clave = new THREE.DirectionalLight("#ffffff", 2.4); clave.position.set(4, 5, 6); escena.add(clave);
    const contra = new THREE.DirectionalLight("#c6ff3d", 1.4); contra.position.set(-6, -2, -4); escena.add(contra);

    const grupo = new THREE.Group(); escena.add(grupo);

    // Núcleo
    const { malla: nucleo, uniforms } = crearNucleo();
    grupo.add(nucleo);
    const corazon = new THREE.Mesh(new THREE.SphereGeometry(0.62, 48, 32), new THREE.MeshBasicMaterial({ color: "#c6ff3d" }));
    grupo.add(corazon);
    const luzCorazon = new THREE.PointLight("#c6ff3d", 6, 8, 2); grupo.add(luzCorazon);
    const halo = new THREE.Mesh(new THREE.SphereGeometry(0.95, 32, 24), new THREE.MeshBasicMaterial({ color: "#c6ff3d", transparent: true, opacity: 0.08, depthWrite: false }));
    grupo.add(halo);

    // Anillos de energía
    const anillos: THREE.Mesh[] = [];
    [[1.85, "#C6FF3D", 0.012], [2.25, "#C6FF3D", 0.008], [2.7, "#C6FF3D", 0.006]].forEach(([r, color, grosor], i) => {
      const a = new THREE.Mesh(new THREE.TorusGeometry(r as number, grosor as number, 12, 180), new THREE.MeshStandardMaterial({ color: color as string, emissive: color as string, emissiveIntensity: 1.6, metalness: 1, roughness: 0.3 }));
      a.rotation.set(Math.PI / 2 + i * 0.5, i * 0.7, 0);
      grupo.add(a); anillos.push(a);
    });

    // Módulos en órbita (servicios)
    const modulos = MODULOS.map((m, i) => {
      const nodo = new THREE.Group();
      const cubo = new THREE.Mesh(
        new THREE.BoxGeometry(0.34, 0.34, 0.34),
        new THREE.MeshPhysicalMaterial({ color: m.color, metalness: 0.5, roughness: 0.2, clearcoat: 1, emissive: m.color, emissiveIntensity: 0.25 })
      );
      const cartel = new THREE.Sprite(new THREE.SpriteMaterial({ map: etiqueta(m.texto, m.color), transparent: true, depthWrite: false }));
      cartel.scale.set(1.15, 0.36, 1);
      cartel.position.set(0, 0.48, 0);
      nodo.add(cubo, cartel);
      grupo.add(nodo);
      return { nodo, cubo, cartel, fase: (i / MODULOS.length) * Math.PI * 2 };
    });

    // Campo de partículas
    const N = movil ? 700 : 1800;
    const puntos = new Float32Array(N * 3), colores = new Float32Array(N * 3);
    const oro = new THREE.Color("#C6FF3D"), cian = new THREE.Color("#C6FF3D");
    for (let i = 0; i < N; i++) {
      const r = 4 + Math.random() * 12, th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
      puntos.set([r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph) * 0.6, r * Math.sin(ph) * Math.sin(th) - 4], i * 3);
      const c = Math.random() > 0.7 ? oro : cian; colores.set([c.r, c.g, c.b], i * 3);
    }
    const geoP = new THREE.BufferGeometry();
    geoP.setAttribute("position", new THREE.BufferAttribute(puntos, 3));
    geoP.setAttribute("color", new THREE.BufferAttribute(colores, 3));
    const particulas = new THREE.Points(geoP, new THREE.PointsMaterial({ size: movil ? 0.035 : 0.028, vertexColors: true, transparent: true, opacity: 0.75, depthWrite: false, blending: THREE.AdditiveBlending }));
    escena.add(particulas);

    // Postproceso (solo escritorio): brillo cinematográfico
    let composer: EffectComposer | null = null;
    let bloom: UnrealBloomPass | null = null;
    if (!movil) {
      composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(escena, camara));
      bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.45, 0.4, 0.88);
      composer.addPass(bloom);
      composer.addPass(new OutputPass());
    }

    // Estado
    const raton = { x: 0, y: 0, tx: 0, ty: 0 };
    let progreso = 0, objetivo = 0;
    const actual = { ...CLAVES[0] };
    const leerScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      objetivo = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };
    const alMover = (e: PointerEvent) => { raton.tx = (e.clientX / window.innerWidth - 0.5) * 2; raton.ty = (e.clientY / window.innerHeight - 0.5) * 2; };
    const alRedimensionar = () => {
      camara.aspect = window.innerWidth / window.innerHeight; camara.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer?.setSize(window.innerWidth, window.innerHeight);
      leerScroll();
    };
    leerScroll();
    window.addEventListener("scroll", leerScroll, { passive: true });
    window.addEventListener("resize", alRedimensionar);
    window.addEventListener("pointermove", alMover, { passive: true });

    const reloj = new THREE.Clock();
    let marco = 0, visible = true, lento = 0;
    const alVisibilidad = () => { visible = document.visibilityState === "visible"; if (visible) reloj.getDelta(); };
    document.addEventListener("visibilitychange", alVisibilidad);

    const pintar = () => {
      const dt = Math.min(reloj.getDelta(), 0.05);
      const t = reloj.elapsedTime;
      progreso += (objetivo - progreso) * (quieto ? 1 : Math.min(1, dt * 4));
      const k = interpolar(progreso);
      for (const c of Object.keys(k) as (keyof Clave)[]) actual[c] += (k[c] - actual[c]) * Math.min(1, dt * 5);

      raton.x += (raton.tx - raton.x) * dt * 3; raton.y += (raton.ty - raton.y) * dt * 3;

      grupo.position.set(movil ? 1.05 + actual.x * MOVIL_X : actual.x, actual.y + (movil ? 2.35 : 0), actual.z);
      grupo.scale.setScalar(actual.escala * (movil ? 0.52 : 1));
      contenedor.style.opacity = String(actual.vis * (movil ? 0.7 : 1));
      grupo.rotation.y = actual.giro + (quieto ? 0 : t * 0.12) + raton.x * 0.25;
      grupo.rotation.x = 0.15 + raton.y * 0.15;

      uniforms.uExplota.value = actual.explota;
      uniforms.uTiempo.value = t;
      nucleo.rotation.y = t * 0.08;
      const pulso = 1 + Math.sin(t * 2.2) * 0.04;
      corazon.scale.setScalar((0.9 + actual.explota * 0.25) * pulso);
      halo.scale.setScalar(1.2 + actual.explota * 0.8 + Math.sin(t * 1.4) * 0.05);
      luzCorazon.intensity = 4 * actual.brillo;
      anillos.forEach((a, i) => { a.rotation.z = t * (0.15 + i * 0.07) * (i % 2 ? -1 : 1); a.scale.setScalar(1 + actual.explota * 0.25 + actual.abre * 0.15); });

      modulos.forEach((m, i) => {
        const radio = 2.0 + actual.abre * 1.9;
        const ang = m.fase + t * (0.22 - actual.abre * 0.1);
        const altura = Math.sin(t * 0.9 + i) * 0.25 + (i % 2 ? 0.35 : -0.35) * (1 - actual.abre);
        m.nodo.position.set(Math.cos(ang) * radio, altura, Math.sin(ang) * radio * 0.75);
        m.cubo.rotation.set(t * 0.6 + i, t * 0.8, 0);
        (m.cartel.material as THREE.SpriteMaterial).opacity = 0.35 + actual.abre * 0.65;
      });

      particulas.rotation.y = t * 0.012 + progreso * 0.8;
      camara.position.x = raton.x * 0.35; camara.position.y = -raton.y * 0.25;
      camara.lookAt(0, 0, -1);

      if (bloom) bloom.strength = 0.3 + actual.brillo * 0.15;
      if (composer) composer.render(); else renderer.render(escena, camara);

      // Calidad adaptativa: si el equipo va justo, se quita el brillo y se baja la resolución
      if (dt > 0.034) { if (++lento > 90 && composer) { composer = null; renderer.setPixelRatio(1); } } else lento = Math.max(0, lento - 1);
    };

    const bucle = () => {
      marco = requestAnimationFrame(bucle);
      if (visible) pintar();
    };
    if (quieto) { pintar(); window.addEventListener("scroll", pintar, { passive: true }); } else bucle();

    return () => {
      cancelAnimationFrame(marco);
      window.removeEventListener("scroll", leerScroll);
      window.removeEventListener("scroll", pintar);
      window.removeEventListener("resize", alRedimensionar);
      window.removeEventListener("pointermove", alMover);
      document.removeEventListener("visibilitychange", alVisibilidad);
      escena.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose?.();
        const mats = Array.isArray(m.material) ? m.material : m.material ? [m.material] : [];
        mats.forEach((mat) => { (mat as THREE.MeshBasicMaterial).map?.dispose(); mat.dispose(); });
      });
      pmrem.dispose(); renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-[5] opacity-0 transition-opacity duration-700" />;
}
