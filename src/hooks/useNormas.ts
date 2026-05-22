import { useEffect, useState } from "react";
import z from "zod";
import { type Norma, type NormaResponse, NormaSchema } from "../types/norma";

export const useNormas = () => {
	const [normas, setNormas] = useState<Norma[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchNormas = async () => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_SERVER_URL}/normas/`,
				);

				if (!response.ok) {
					throw new Error("Erro ao pesquisar as normas");
				}

				const responseJSON: NormaResponse[] = await response.json();

				const normasJSON: Norma[] = responseJSON.map((n) => ({
					...n,
					tags: n.tags?.flatMap((t) => t.tag) || null,
				}));

				const parsed = z.array(NormaSchema).safeParse(normasJSON);

				if (!parsed.success) throw new Error(parsed.error.message);

				setNormas(normasJSON);
			} catch (err) {
				if (err instanceof Error) {
					setError(err.message);
				}
			} finally {
				setLoading(false);
			}
		};

		fetchNormas();
	}, []);

	return { normas, setNormas, loading, error };
};
