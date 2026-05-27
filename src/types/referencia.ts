import z from "zod";

export const referenciaSchema = z.object({
	id: z.uuid(),
	titulo: z.string(),
	codigo: z.string(),
	observacao: z.string().optional(),
});

export type Referencia = z.infer<typeof referenciaSchema>;
