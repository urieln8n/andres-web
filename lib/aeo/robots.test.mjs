// Test de los cinco casos del emparejado RFC 9309. Ejecutar: node --experimental-strip-types lib/aeo/robots.test.mjs
import assert from "node:assert/strict";
import { parsearRobots, permitido } from "./robots.ts";

const robots = parsearRobots(`
User-agent: Applebot
Allow: /

User-agent: Applebot-Extended
Disallow: /

User-agent: Google
Disallow: /privado

User-agent: *
Allow: /
`);

const casos = [
  ["Applebot", "/", true],
  ["Applebot-Extended", "/", false],
  ["Googlebot", "/", true],
  ["Googlebot", "/privado", false],
  ["OtroBot", "/", true],
];

for (const [ua, ruta, esperado] of casos) {
  assert.equal(permitido(robots, ua, ruta), esperado, `${ua} ${ruta}`);
  console.log(`ok  ${ua.padEnd(18)} ${ruta.padEnd(9)} ${esperado ? "permitido" : "bloqueado"}`);
}
console.log("5/5 casos correctos");
