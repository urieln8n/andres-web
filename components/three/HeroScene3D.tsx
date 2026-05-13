"use client";

import { Html, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Group } from "three";

const labels = ["IA", "SEO", "CRM", "Automatización", "Leads", "Web Premium", "SaaS"];

function SystemCore({ reduced }: { reduced: boolean }) {
  const group = useRef<Group>(null);
  const nodes = useMemo(
    () => labels.map((label, index) => {
      const angle = (index / labels.length) * Math.PI * 2;
      const radius = index % 2 ? 2.45 : 2.05;
      return { label, x: Math.cos(angle) * radius, y: Math.sin(angle * 1.7) * .42, z: Math.sin(angle) * radius };
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
      <mesh>
        <sphereGeometry args={[.82, 48, 48]} />
        <meshStandardMaterial color="#67e8f9" emissive="#0e7490" emissiveIntensity={.45} roughness={.22} metalness={.35} />
      </mesh>
      {[0, 1, 2].map((ring) => (
        <mesh key={ring} rotation={[Math.PI / (2.4 + ring), ring * .75, ring * .42]}>
          <torusGeometry args={[1.35 + ring * .38, .012, 12, 120]} />
          <meshStandardMaterial color={ring === 1 ? "#a78bfa" : "#f5c776"} emissive="#111827" transparent opacity={.8} />
        </mesh>
      ))}
      {nodes.map((node, index) => (
        <group key={node.label} position={[node.x, node.y, node.z]}>
          <mesh>
            <sphereGeometry args={[.07, 18, 18]} />
            <meshStandardMaterial color={index % 2 ? "#f5c776" : "#67e8f9"} emissive="#0891b2" emissiveIntensity={.55} />
          </mesh>
          <Html center distanceFactor={7}>
            <div className="whitespace-nowrap rounded-full border border-white/15 bg-slate-950/75 px-3 py-1 text-[11px] font-semibold text-white shadow-premium backdrop-blur">
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
    <div className="premium-border relative min-h-[430px] overflow-hidden rounded-[2rem] bg-white/[.045] shadow-premium lg:min-h-[560px]">
      <Canvas dpr={mobile ? [1, 1.25] : [1, 1.75]} camera={{ position: [0, 1.2, mobile ? 6.2 : 5.2], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={1.25} />
        <pointLight position={[3, 4, 5]} intensity={2.3} color="#67e8f9" />
        <pointLight position={[-4, -2, -3]} intensity={1.2} color="#a78bfa" />
        <SystemCore reduced={reduced || mobile} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={!reduced && !mobile} autoRotateSpeed={.55} />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-5 bottom-5 grid gap-3 rounded-2xl border border-white/10 bg-slate-950/70 p-4 backdrop-blur md:grid-cols-3">
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
