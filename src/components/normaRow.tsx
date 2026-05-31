import { SearchCheckIcon } from "lucide-react";
import { Link } from "react-router";
import { useNormaContext } from "../hooks/useNormaContext";
import type { Norma } from "../types/norma";
import StatusVersao from "./statusVersao";

interface NormaRowProps {
	norma: Norma;
}

export default function NormaRow({ norma }: NormaRowProps) {
	const { setNormaAtual } = useNormaContext();
	const isRevisada = norma.versoes.some((versao) => versao.status === true);

	function directToNorma() {
		setNormaAtual(norma)
		localStorage.setItem("norma", JSON.stringify(norma))
	}

	return (
		<div className="table_norma bg-white">
			<div className="flex flex-col items-start">
				<span className="font-semibold text-md">{norma.titulo}</span>
				<span className="text-black/60 text-sm">{norma.codigo}</span>
			</div>
			<span>{norma.orgao_emissor}</span>
			<span>
				{new Date(norma.versoes[0].data_publicacao).toLocaleDateString("pt-BR")}
			</span>
			<StatusVersao isRevisada={isRevisada} />
			<Link to="/visualizarNorma" onClick={directToNorma}>
				<SearchCheckIcon />
			</Link>
		</div>
	);
}
