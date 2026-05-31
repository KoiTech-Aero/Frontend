import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { useNormaContext } from "../hooks/useNormaContext";
import type { Referencia } from "../types/referencia";

interface ModalReferenciasProps {
	normas: Referencia[];
	setMostrarRelacoes: Dispatch<SetStateAction<boolean>>;
}

export default function ModalReferencias({
	normas,
	setMostrarRelacoes,
}: ModalReferenciasProps) {
	const { adicionaReferencia } = useNormaContext();
	const [referenciaData, setReferenciaData] = useState<Referencia[]>([]);

	async function handleReferenciaData(
		normaReferencia: Referencia
	) {
		if (referenciaData.every(rd => rd !== normaReferencia)) setReferenciaData((prev) => [...prev, normaReferencia]);
		else setReferenciaData((prev) => prev.filter((n) => n !== normaReferencia))
	}

	useEffect(() => {
		console.log(referenciaData)
	}, [referenciaData			])

	return (
		<dialog className="fixed w-full h-full inset-0 bg-black/30 flex flex-col justify-center items-center px-4">
			<header className="bg-white max-w-125 w-full p-5 rounded-t-2xl border-b border-b-black/25">
				<h1 className="text-lg font-bold ">Selecionar Norma</h1>
				<h2 className="text-md font-medium text-black/50">
					Escolha uma ou mais normas para relacionar com esta.
				</h2>
			</header>

			<main className="bg-white max-w-125 w-full p-5 space-y-2">
				{normas.map((n) => (
					<div key={n.id}>
						<input
							type="checkbox"
							id={`input-${n.id}`}
							className="hidden peer"
							onChange={() => handleReferenciaData(n)}
						/>
						<label
							htmlFor={`input-${n.id}`}
							className="inline-block w-full text-left border border-red/50 p-2 rounded-full cursor-pointer hover:bg-gray-100 peer-checked:bg-red peer-checked:hover:bg-red-hover peer-checked:text-white"
						>
							<span className="bg-blue-200 text-black px-2 py-1 mr-2 rounded-full">
								{n.codigo}
							</span>
							{n.titulo}
						</label>
					</div>
				))}

				{normas.length === 0 && (
					<p className="text-center">Não há normas disponives</p>
				)}
			</main>
			<footer className="bg-white max-w-125 w-full px-5 py-2 rounded-b-2xl">
				<div className="w-full flex items-center justify-end gap-2">
					<button
						type="button"
						onClick={() => setMostrarRelacoes(false)}
						className="h-fit text-black border border-black rounded-full px-3 py-1 hover:bg-gray-200"
					>
						Fechar
					</button>

					<button
						type="button"
						onClick={() => adicionaReferencia(referenciaData)}
						className="bg-red text-white px-3 py-2 rounded-full hover:bg-red-hover"
						disabled={normas.length === 0}
					>
						Adicionar
					</button>
				</div>
			</footer>
		</dialog>
	);
}
