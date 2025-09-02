import { z } from "zod";

export const RegisterIA = z.object({
  id: z.string().uuid(),
  userId: z.string(),           
  code: z.string().min(3).max(20),
  name: z.string().min(2),
  value: z.number().int().nonnegative()
});

// Normaliza un string
export function normalizeString(str) {
  if (!str || typeof str !== "string") return "";
  return str
    .normalize("NFD") // separa letras y acentos
    .replace(/[\u0300-\u036f]/g, "") // quita los acentos
    .trim()
    .toLowerCase();
}
