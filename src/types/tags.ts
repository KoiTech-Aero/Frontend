import z from "zod";

export const TagSchema = z.object({
	id: z.string(),
	nome: z.string(),
	descricao: z.string().optional(),
});

export type Tag = z.infer<typeof TagSchema>;
