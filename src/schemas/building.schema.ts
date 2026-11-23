
import { z } from "zod";

export const BuildingSchema = z.object({
  name: z.string().min(1, "Naam is verplicht"),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

export type Building = z.infer<typeof BuildingSchema>;
