import { useEffect, useState } from "react";
import z from "zod";
import { type Tag, TagSchema } from "../types/tags";

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

				setTags(tagsJSON);
			} catch (err) {
				if (err instanceof Error) {
					setError(err);
				}
			} finally {
				setLoading(false);
			}
		}

		fetchTags();
	}, []);

	return { tags, setTags, error, loading };
};
