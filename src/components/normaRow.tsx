import { File } from "lucide-react";
import { Link } from "react-router";
import type { Norma } from "../types/norma";
import StatusVersao from "./statusVersao";

interface NormaRowProps {
	norma: Norma;
}

export default function NormaRow({ norma }: NormaRowProps) {
	const isRevisada = norma.versoes.some((versao) => versao.status === true);

	return (
		<div className="table_norma bg-white">
			<div className="flex flex-col items-start">
				<span className="font-semibold text-xl">{norma.titulo}</span>
				<span className="text-black/60 text-sm">{norma.codigo}</span>
			</div>
			<span>{norma.orgao_emissor}</span>
			<span>{new Date(norma.versoes[0].data_publicacao).toDateString()}</span>
			<StatusVersao isRevisada={isRevisada} />
			<Link to="/visualizarNorma" state={{ norma: norma }}>
				<File />
			</Link>
		</div>
	);
}
