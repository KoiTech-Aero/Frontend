import type { ComponentProps } from "react";

interface TagProps extends ComponentProps<"input"> {
	id: string;
	nome: string;
}

export default function Tag({ id, nome, ...props }: TagProps) {
	return (
		<button type="button">
			<input
				type="checkbox"
				id={`checkTag-${id}`}
				className="hidden peer"
				{...props}
			/>
			<label
				htmlFor={`checkTag-${id}`}
				className="inline-block bg-red text-white font-semibold py-2 px-4 rounded-full peer-checked:bg-red-dark select-none"
			>
				{nome}
			</label>
		</button>
	);
}
