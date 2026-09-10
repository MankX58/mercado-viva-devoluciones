import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// En Vite, solo las variables prefijadas con VITE_ se exponen al navegador.
// Eso es justo lo que pasa aquí: este connection string queda visible en el
// bundle de JS que se le entrega al cliente.
const connectionString = import.meta.env.VITE_DATABASE_URL;

if (!connectionString) {
  throw new Error("Falta la variable VITE_DATABASE_URL en tu archivo .env");
}

const sql = neon(connectionString);

export const db = drizzle(sql, { schema });
