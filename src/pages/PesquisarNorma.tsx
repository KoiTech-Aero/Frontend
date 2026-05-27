import { useEffect, useState } from "react";
import BarraPesquisa from "../components/BarraPesquisa";
import NormaRow from "../components/normaRow";
import { useNormas } from "../hooks/useNormas";
import type { Norma } from "../types/norma";

export default function PesquisarNorma() {
	const { normas, error } = useNormas();
	const [normasFiltradas, setNormasFiltradas] = useState<Norma[]>([]);

	useEffect(() => {
		setNormasFiltradas(normas);
		console.log(error);
	}, [normas, error]);

	return (
		<div className="w-[90%] flex flex-col items-center gap-5 px-2 py-5">
			<BarraPesquisa normas={normas} setNormasFiltradas={setNormasFiltradas} />

			<section className="flex flex-col w-full rounded-md **:rounded-md nth-last-ch shadow-[0px_0px_5px_0px_rgba(0,0,0,0.50)]">
				<div className="table_norma font-bold text-black/60 font-mono tracking-wide  uppercase">
					<h1>Nome da norma</h1>
					<h1>Orgão</h1>
					<h1>Data de Lançamento</h1>
					<h1>Status</h1>
					<h1>Detalhes</h1>
				</div>

				{normasFiltradas.map((norma) => (
					<NormaRow key={norma.id} norma={norma} />
				))}

				{normasFiltradas.length === 0 && (
					<div className="table_norma bg-white">
						<h1 className="block w-full col-span-7 text-center">
							Não há nenhuma norma registrada
						</h1>
					</div>
				)}
			</section>
		</div>
	);
}
