import { redirect } from "next/navigation";

// Alias canónico: el contenido vive en /casos/barberiaos
export default function BarberiaosRedirect() {
  redirect("/casos/barberiaos");
}
