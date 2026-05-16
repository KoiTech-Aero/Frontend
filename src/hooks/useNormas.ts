import { useEffect, useState } from "react";
import type { Norma } from "../types/norma";

export const useNormas = () => {
	const [normas, setNormas] = useState<Norma[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchNormas = async () => {
			try {
				const response = await fetch("http://localhost:3000/normas/");

				if (!response.ok) {
					throw new Error("Erro ao pesquisar as normas");
				}

				const normasJSON: Norma[] = await response.json();

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
