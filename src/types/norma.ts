import z from "zod";
import { TagSchema } from "./tags";

export const VersaoSchema = z.object({
	versao_numero: z.string(),
	descricao: z.string(),
	data_publicacao: z.coerce.date(),
	status: z.boolean(),
	path_file: z.string(),
});

export type Versao = z.infer<typeof VersaoSchema>;

export const NormaSchema = z.object({
	id: z.string(),
	codigo: z.string(),
	titulo: z.string(),
	escopo: z.string(),
	area_tecnica: z.string(),
	orgao_emissor: z.string(),
	versoes: z.array(VersaoSchema),
	tags: z.array(TagSchema).nullable(),
});

export type Norma = z.infer<typeof NormaSchema>;

export const NormaResponseSchema = z.object({
	id: z.string(),
	codigo: z.string(),
	titulo: z.string(),
	escopo: z.string(),
	area_tecnica: z.string(),
	orgao_emissor: z.string(),
	versoes: z.array(VersaoSchema),
	tags: z
		.array(
			z.object({
				tag: TagSchema,
			}),
		)
		.nullable(),
});

export type NormaResponse = z.infer<typeof NormaResponseSchema>;
