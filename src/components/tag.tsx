interface TagProps {
	id: string;
	nome: string;
}

export default function Tag({ id, nome }: TagProps) {
	return (
		<div>
			<input type="checkbox" id={`checkTag-${id}`} className="hidden peer" />
			<label
				htmlFor={`checkTag-${id}`}
				className="inline-block bg-red text-white font-semibold py-2 px-4 rounded-full peer-checked:bg-red-dark select-none"
			>
				{nome}
			</label>
		</div>
	);
}
