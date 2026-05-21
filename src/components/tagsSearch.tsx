import { Plus } from "lucide-react";
import { useRef } from "react";
import { useTags } from "../hooks/useTags";
import Tag from "./tag";

export default function TagsSearch() {
	const { tags } = useTags();
	const containerRef = useRef<HTMLDivElement>(null);

	function scrollRight() {
		containerRef.current?.scrollBy({
			left: 200,
			behavior: "smooth",
		});
	}

	function scrollLeft() {
		containerRef.current?.scrollBy({
			left: -200,
			behavior: "smooth",
		});
	}

	return (
		<div className="flex items-center gap-2">
			<div className="flex items-center gap-5">
				<button
					type="button"
					className="bg-white h-fit rounded-full p-2"
					onClick={scrollLeft}
				>
					‹
				</button>

				<div
					ref={containerRef}
					className="flex space-x-2 max-w-100 scrollbar overflow-x-scroll"
				>
					{tags.map((tag) => (
						<Tag key={tag.id} id={tag.id} nome={tag.nome} />
					))}
				</div>

				<button
					type="button"
					className="bg-white h-fit rounded-full p-2"
					onClick={scrollRight}
				>
					›
				</button>
			</div>

			<span className="inline-flex h-fit items-center justify-center bg-white border border-gray-300 p-1.5 rounded-full">
				<Plus className="inline-block" />
			</span>
		</div>
	);
}
