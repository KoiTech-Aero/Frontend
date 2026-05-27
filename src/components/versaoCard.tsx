import { Eye } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import type { Norma, Versao } from "../types/norma";
import Badge from "./badge";

interface VersaoCardProps {
	versao: Versao;
}

export default function VersaoCard({ versao }: VersaoCardProps) {
	const navigate = useNavigate();
	const [norma] = useState<Norma>();

	return (
		<article
			key={versao.versao_numero}
			className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 p-3 border rounded-2xl border-gray-300"
		>
			<div className="flex items-center gap-2">
				<div
					className={`${versao.status ? "bg-green-200" : "bg-red-200"} p-4 rounded-2xl`}
				>
					{versao.versao_numero}
				</div>
				<div>
					<div className="flex items-center gap-2">
						<p className="font-medium">{versao.descricao}</p>
						<Badge
							point
							noBG
							size={"none"}
							variant={versao.status ? "verde" : "vermelho"}
						>
							{versao.status ? "Revisada" : "Obsoleta"}
						</Badge>
					</div>
					<p className="text-black/50">
						Publicada em {""}
						{new Date(versao.data_publicacao).toLocaleDateString("pt-BR")}
					</p>
				</div>
			</div>

			<button
				type="button"
				onClick={() =>
					navigate("/visualizarVersao", {
						state: { norma, versao },
					})
				}
				className="flex items-center gap-1 text-md font-bold text-blue-500 hover:bg-blue-100 p-2 rounded-full w-full md:w-auto md:text-left"
			>
				<Eye size={"20px"} />
				Visualizar
			</button>
		</article>
	);
}
