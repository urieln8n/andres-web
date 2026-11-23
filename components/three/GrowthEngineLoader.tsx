"use client";

import dynamic from "next/dynamic";

// El motor 3D se carga solo en el navegador y después del contenido: no frena la portada ni el SEO.
const GrowthEngine3D = dynamic(() => import("./GrowthEngine3D"), { ssr: false });

export function GrowthEngineLoader() {
  return <GrowthEngine3D />;
}
