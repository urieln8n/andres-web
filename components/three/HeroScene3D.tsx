"use client";

import { Float, Html, Line, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Group } from "three";

const labels = ["IA", "SEO", "CRM", "WhatsApp", "Leads", "Automatización", "SaaS"];

function SystemCore({ reduced }: { reduced: boolean }) {
  const group = useRef<Group>(null);
  const nodes = useMemo(
    () => labels.map((label, index) => {
      const angle = (index / labels.length) * Math.PI * 2;
      const radius = index % 2 ? 2.55 : 2.12;
      return { label, x: Math.cos(angle) * radius, y: Math.sin(angle * 1.7) * .48, z: Math.sin(angle) * radius };
    }),
    []
  );

  useFrame(({ clock, pointer }) => {
    if (!group.current || reduced) return;
    group.current.rotation.y = clock.elapsedTime * .18 + pointer.x * .12;
    group.current.rotation.x = pointer.y * .05;
  });

  return (
    <group ref={group}>
      <Float speed={reduced ? 0 : 1.2} rotationIntensity={reduced ? 0 : .35} floatIntensity={reduced ? 0 : .45}>
        <mesh>
          <sphereGeometry args={[.92, 64, 64]} />
          <meshStandardMaterial color="#8beeff" emissive="#0891b2" emissiveIntensity={.68} roughness={.18} metalness={.42} />
        </mesh>
        <mesh>
          <sphereGeometry args={[1.05, 64, 64]} />
          <meshBasicMaterial color="#67e8f9" transparent opacity={.09} />
        </mesh>
        {[0, 1, 2, 3].map((ring) => (
          <mesh key={ring} rotation={[Math.PI / (2.35 + ring), ring * .72, ring * .38]}>
            <torusGeometry args={[1.38 + ring * .34, ring === 0 ? .018 : .012, 12, 140]} />
            <meshStandardMaterial color={ring === 1 ? "#a78bfa" : ring === 2 ? "#67e8f9" : "#f5c776"} emissive="#111827" transparent opacity={ring === 0 ? .95 : .76} />
          </mesh>
        ))}
      </Float>
      {nodes.map((node) => (
        <Line key={`${node.label}-line`} points={[[0, 0, 0], [node.x, node.y, node.z]]} color="#67e8f9" lineWidth={1} transparent opacity={.18} />
      ))}
      {nodes.map((node, index) => (
        <group key={node.label} position={[node.x, node.y, node.z]}>
          <mesh>
            <sphereGeometry args={[.085, 24, 24]} />
            <meshStandardMaterial color={index % 2 ? "#f5c776" : "#67e8f9"} emissive={index % 2 ? "#a16207" : "#0891b2"} emissiveIntensity={.7} />
          </mesh>
          <Html center distanceFactor={7}>
            <div className="whitespace-nowrap rounded-full border border-white/15 bg-slate-950/78 px-3 py-1 text-[11px] font-semibold text-white shadow-premium backdrop-blur">
              {node.label}
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
}

export function HeroScene3D() {
  const [reduced, setReduced] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const sync = () => {
      setReduced(reduceQuery.matches);
      setMobile(mobileQuery.matches);
    };
    sync();
    reduceQuery.addEventListener("change", sync);
    mobileQuery.addEventListener("change", sync);
    return () => {
      reduceQuery.removeEventListener("change", sync);
      mobileQuery.removeEventListener("change", sync);
    };
  }, []);

  return (
    <div className="premium-border spotlight-panel relative min-h-[390px] overflow-hidden rounded-[2rem] bg-white/[.045] shadow-premium sm:min-h-[430px] lg:min-h-[560px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(103,232,249,.18),transparent_24rem)]" />
      <Canvas dpr={mobile ? [1, 1.25] : [1, 1.75]} camera={{ position: [0, 1.2, mobile ? 6.2 : 5.2], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={1.05} />
        <pointLight position={[3, 4, 5]} intensity={2.7} color="#67e8f9" />
        <pointLight position={[-4, -2, -3]} intensity={1.25} color="#a78bfa" />
        <pointLight position={[0, 2.8, -2]} intensity={1.1} color="#f5c776" />
        <SystemCore reduced={reduced || mobile} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={!reduced && !mobile} autoRotateSpeed={.55} />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-4 bottom-4 grid gap-3 rounded-2xl border border-white/10 bg-slate-950/72 p-4 backdrop-blur md:inset-x-5 md:bottom-5 md:grid-cols-3">
        {["Leads cualificados", "CRM visual", "Automatizaciones IA"].map((item) => (
          <div key={item}>
            <p className="text-[11px] uppercase tracking-[.18em] text-cyan-200">{item}</p>
            <p className="mt-1 text-sm text-slate-300">Conectado al sistema comercial.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
