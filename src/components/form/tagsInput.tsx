import { useState } from "react";
import { useTags } from "../../hooks/useTags";
import type { Tag } from "../../types/tags";
import type { tagsInputProps } from "../../types/tagsInput";

export default function TagsInput({ tags, setTags }: tagsInputProps) {
	const [buscaTag, setBuscaTag] = useState("");
	const { tags: tagsList } = useTags();
	const [mostrarDropdown, setMostrarDropdown] = useState(false);

	function adicionarTag(tag: Tag) {
		if (!tags.includes(tag)) {
			setTags([...tags, tag]);
		}

		setBuscaTag("");
	}

	function removerTag(tag: Tag) {
		setTags(tags.filter((t) => t !== tag));
	}

	const tagsFiltradas = tagsList.filter(
		(tag) =>
			tag.nome.toLowerCase().includes(buscaTag.toLowerCase()) &&
			!tags.includes(tag),
	);

	return (
		<div className="relative flex flex-col gap-3">
			<label htmlFor="" className="text-sm font-medium text-gray-700">
				Tags
			</label>

			<input
				type="text"
				value={buscaTag}
				placeholder="Pesquisar tags..."
				onFocus={() => setMostrarDropdown(true)}
				onBlur={() => {
					setTimeout(() => {
						setMostrarDropdown(false);
					}, 150);
				}}
				onChange={(e) => {
					setBuscaTag(e.target.value);
					setMostrarDropdown(true);
				}}
				className="
          w-full
          rounded-lg
          border border-gray-300
          bg-white
          px-3 py-2
          text-sm
          outline-none
          transition
          focus:border-gray-500
          focus:ring-2 focus:ring-gray-100
        "
			/>

			{mostrarDropdown && (
				<div
					className="
            absolute
            top-18
            z-10
            w-full
            max-h-60
            overflow-y-auto
            rounded-lg
            border border-gray-300
            bg-white
            shadow-lg
          "
				>
					{tagsFiltradas.length > 0 ? (
						tagsFiltradas.map((tag) => (
							<button
								type="button"
								key={tag.id}
								onClick={() => {
									adicionarTag(tag);
									setMostrarDropdown(false);
								}}
								className="
                  block
                  w-full
									text-left
                  cursor-pointer
                  px-3 py-2
                  text-sm
                  transition
                  hover:bg-gray-100
                "
							>
								{tag.nome}
							</button>
						))
					) : (
						<div className="px-3 py-2 text-sm text-gray-500">
							Nenhuma tag encontrada
						</div>
					)}
				</div>
			)}

			<div className="flex flex-wrap gap-2">
				{tags.map((tag) => (
					<div
						key={tag.id}
						className="
              flex items-center gap-2
              rounded-full
              bg-blue-100
              px-3 py-1
              text-sm text-gray-700
            "
					>
						{tag.nome}

						<button
							type="button"
							onClick={() => removerTag(tag)}
							className="
                cursor-pointer
                transition
                hover:text-red-500
              "
						>
							×
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
