interface StatusVersaoProps {
	isRevisada: boolean;
}

export default function StatusVersao({ isRevisada }: StatusVersaoProps) {
	if (isRevisada)
		return <span className="bg-green-500 p-2 rounded-full">Revisada</span>;
	return <span className="bg-red-500 p-2 rounded-full">Revisada</span>;
}
