interface StatusVersaoProps {
	isRevisada: boolean;
}

export default function StatusVersao({ isRevisada }: StatusVersaoProps) {
	if (isRevisada)
		return (
			<span className="border border-green-500 p-2 rounded-full">Revisada</span>
		);
	return (
		<span className="border border-red-500 p-2 rounded-full">Revisada</span>
	);
}
