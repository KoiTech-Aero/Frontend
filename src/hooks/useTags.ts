import { useState } from "react";
import type { Tag } from "../types/tags";

export const useTags = () => {
	const [tags, setTags] = useState([
		{ id: "1", nome: "Tecnologia" },
		{ id: "2", nome: "Frontend" },
		{ id: "3", nome: "Backend" },
		{ id: "4", nome: "Mobile" },
		{ id: "5", nome: "Design" },
		{ id: "6", nome: "UI/UX" },
		{ id: "7", nome: "JavaScript" },
		{ id: "8", nome: "TypeScript" },
		{ id: "9", nome: "React" },
		{ id: "10", nome: "Node.js" },
	]);

	return { tags, setTags };
};
