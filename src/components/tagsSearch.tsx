import { Plus } from "lucide-react";
import { useTags } from "../hooks/useTags";
import Tag from "./tag";

export default function TagsSearch() {
	const { tags } = useTags();

	return (
		<div className="flex items-center gap-2">
			<div className="flex items-center gap-5">
				<button type="button" className="bg-white h-fit rounded-full p-2">
					‹
				</button>

				<div className="flex space-x-2 max-w-100 scrollbar overflow-x-scroll">
					{tags.map((tag) => (
						<Tag key={tag.id} nome={tag.nome} />
					))}
				</div>

				<button type="button" className="bg-white h-fit rounded-full p-2">
					›
				</button>
			</div>

			<span className="inline-flex h-fit items-center justify-center bg-white border border-gray-300 p-1.5 rounded-full">
				<Plus className="inline-block" />
			</span>
		</div>
	);
}
