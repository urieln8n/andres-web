"use client";

import dynamic from "next/dynamic";
import { SceneFallback } from "./SceneFallback";

const DynamicHeroScene = dynamic(() => import("./HeroScene3D").then((mod) => mod.HeroScene3D), {
  ssr: false,
  loading: () => <SceneFallback />,
});

export function FloatingSystem3D() {
  return <DynamicHeroScene />;
}
