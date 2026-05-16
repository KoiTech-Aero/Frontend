interface TagProps {
	nome: string;
}

export default function Tag({ nome }: TagProps) {
	return (
		<span className="inline-block bg-red text-white font-semibold py-2 px-4 rounded-full">
			{nome}
		</span>
	);
}
