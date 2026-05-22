import type { Tag } from "./tags";

export interface tagsInputProps {
	tags: Tag[];
	setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
}
