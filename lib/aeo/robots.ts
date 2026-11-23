// Lectura de robots.txt según RFC 9309.
// Gana el grupo cuyo nombre coincide de forma más específica; «*» es el comodín final.
// El nombre del grupo puede ser prefijo del crawler («Google» captura a «Googlebot»),
// pero NUNCA al revés: un grupo «Applebot-Extended» no debe capturar a «Applebot».

export interface ReglaRobots {
  tipo: "allow" | "disallow";
  ruta: string;
}

export interface GrupoRobots {
  agentes: string[];
  reglas: ReglaRobots[];
}

export interface AnalisisRobots {
  grupos: GrupoRobots[];
  sitemaps: string[];
}

export function parsearRobots(texto: string): AnalisisRobots {
  const grupos: GrupoRobots[] = [];
  const sitemaps: string[] = [];
  let actual: GrupoRobots | null = null;
  let leyendoAgentes = false;

  for (const lineaBruta of texto.split(/\r?\n/)) {
    const linea = lineaBruta.replace(/#.*$/, "").trim();
    if (!linea) continue;
    const separador = linea.indexOf(":");
    if (separador < 0) continue;
    const clave = linea.slice(0, separador).trim().toLowerCase();
    const valor = linea.slice(separador + 1).trim();

    if (clave === "user-agent") {
      if (!actual || !leyendoAgentes) {
        actual = { agentes: [], reglas: [] };
        grupos.push(actual);
      }
      actual.agentes.push(valor.toLowerCase());
      leyendoAgentes = true;
    } else if (clave === "allow" || clave === "disallow") {
      leyendoAgentes = false;
      if (actual) actual.reglas.push({ tipo: clave, ruta: valor });
    } else if (clave === "sitemap") {
      sitemaps.push(valor);
    } else {
      leyendoAgentes = false;
    }
  }
  return { grupos, sitemaps };
}

export function grupoPara(analisis: AnalisisRobots, ua: string): GrupoRobots | null {
  const objetivo = ua.toLowerCase();
  let mejor: GrupoRobots | null = null;
  let mejorLargo = -1;
  let comodin: GrupoRobots | null = null;

  for (const grupo of analisis.grupos) {
    for (const agente of grupo.agentes) {
      if (agente === "*") {
        comodin = comodin ?? grupo;
        continue;
      }
      // BIEN: solo el nombre del grupo como prefijo del crawler, nunca al revés.
      if (objetivo === agente || objetivo.startsWith(agente)) {
        if (agente.length > mejorLargo) {
          mejor = grupo;
          mejorLargo = agente.length;
        }
      }
    }
  }
  return mejor ?? comodin;
}

function coincideRuta(patron: string, ruta: string): number {
  if (!patron) return -1;
  const ancla = patron.endsWith("$");
  const cuerpo = ancla ? patron.slice(0, -1) : patron;
  const regex = new RegExp(
    "^" + cuerpo.split("*").map((p) => p.replace(/[.+?^${}()|[\]\\]/g, "\\$&")).join(".*") + (ancla ? "$" : "")
  );
  return regex.test(ruta) ? cuerpo.replace(/\*/g, "").length : -1;
}

export function permitido(analisis: AnalisisRobots, ua: string, ruta = "/"): boolean {
  const grupo = grupoPara(analisis, ua);
  if (!grupo) return true;
  let mejor: ReglaRobots | null = null;
  let mejorLargo = -1;
  for (const regla of grupo.reglas) {
    const largo = coincideRuta(regla.ruta, ruta);
    if (largo < 0) continue;
    // A igual longitud gana allow (RFC 9309, regla menos restrictiva).
    if (largo > mejorLargo || (largo === mejorLargo && regla.tipo === "allow")) {
      mejor = regla;
      mejorLargo = largo;
    }
  }
  return !mejor || mejor.tipo === "allow";
}
