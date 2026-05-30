import { useEffect, useState } from "react";
import z from "zod";
import { type Tag, TagSchema } from "../types/tags";
import { tagsMock } from "../utils/tagsMockData";

const tagsMockFormatadas: Tag[] = tagsMock.map((nome, index) => ({
	id: `mock-${index}`,
	nome,
}));

export const useTags = () => {
	const [tags, setTags] = useState<Tag[]>([]);
	const [error, setError] = useState<Error>();
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		async function fetchTags() {
			try {
				const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/tags`);

				if (!response.ok) throw new Error("Erro no Fetch");

				const tagsJSON: Tag[] = await response.json();
				const parsed = z.array(TagSchema).safeParse(tagsJSON);

				if (!parsed.success) throw new Error("Formato inválido");

				const nomesDaApi = tagsJSON.map((t) => t.nome.toLowerCase());
				const mockSemDuplicatas = tagsMockFormatadas.filter(
					(t) => !nomesDaApi.includes(t.nome.toLowerCase())
				);

				setTags([...tagsJSON, ...mockSemDuplicatas])
			} catch (err) {
				if (err instanceof Error) {
					setError(err);
					setTags(tagsMockFormatadas);
				}
			} finally {
				setLoading(false);
			}
		}

		fetchTags();
	}, []);

	return { tags, setTags, error, loading };
};
