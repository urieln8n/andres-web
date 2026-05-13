"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { SceneFallback } from "./SceneFallback";

const DynamicHeroScene = dynamic(() => import("./HeroScene3D").then((mod) => mod.HeroScene3D), {
  ssr: false,
  loading: () => <SceneFallback />,
});

export function FloatingSystem3D() {
  const [reducedScene, setReducedScene] = useState(true);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 767px)");
    const update = () => setReducedScene(reduceMotion.matches || mobile.matches);
    update();
    reduceMotion.addEventListener("change", update);
    mobile.addEventListener("change", update);
    return () => {
      reduceMotion.removeEventListener("change", update);
      mobile.removeEventListener("change", update);
    };
  }, []);

  if (reducedScene) return <SceneFallback />;

  return <DynamicHeroScene />;
}
