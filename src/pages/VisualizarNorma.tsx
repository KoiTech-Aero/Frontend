import { FileText, History, Link as LinkIcon, Plus, Tags } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import Badge from "../components/badge";
import ModalReferencias from "../components/modalReferencias";
import ReferenciaCard from "../components/referenciaCard";
import VersaoCard from "../components/versaoCard";
import { useNormaContext } from "../hooks/useNormaContext";
import { useNormas } from "../hooks/useNormas";

export default function VisualizarNorma() {
	const navigate = useNavigate();

	const { normas } = useNormas();

	const { normaAtual, referencias, fetchReferencias } = useNormaContext();

	const containerRef = useRef<HTMLDivElement>(null);
	const [mostrarRelacoes, setMostrarRelacoes] = useState(false);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <Não é necessário colocar a função fetchReferencias>
	useEffect(() => {
		if (!normaAtual?.id) return;

		async function asyncFetch() {
			await fetchReferencias();
		}

		containerRef.current?.scrollTo({
			top: 0,
			behavior: "smooth",
		});

		asyncFetch()
	}, [normaAtual?.id]);

	if (!normaAtual) return <p>Nenhuma norma recebida</p>;

	return (
		<>
			<main
				ref={containerRef}
				className="max-w-6xl w-full h-max px-6 my-3 mx-auto flex flex-col gap-5"
			>
				<section className="flex flex-col gap-1">
					<Badge point variant={"verde"} className="w-fit">
						{normaAtual.codigo}
					</Badge>
					<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
						{normaAtual.titulo}
					</h1>
				</section>

				<section className="flex flex-col gap-5 bg-white rounded-md p-5 shadow-[0px_0px_5px_5px_rgba(0,0,0,0.1)]">
					<div className="flex items-center gap-2">
						<span className="bg-red-200 p-2 rounded-full">
							<FileText />
						</span>
						<h3 className="text-lg md:text-xl font-bold">Escopo</h3>
					</div>
					<p className="border rounded-xl p-3 md:p-4 lg:p-5 border-gray-300 bg-gray-100 font-medium">
						{normaAtual.escopo}
					</p>
				</section>

				<section className="flex flex-col gap-5 bg-white rounded-md p-5 shadow-[0px_0px_5px_5px_rgba(0,0,0,0.1)]">
					<div className="flex items-center gap-2">
						<span className="bg-red-200 p-2 rounded-full">
							<History />
						</span>
						<h3 className="text-lg md:text-xl font-bold">Versões</h3>
						<button
							type="button"
							className="inline-flex items-center gap-1 bg-red hover:bg-red-hover text-white px-3 py-1.5 rounded-xl hover:scale-[1.02] ml-auto"
							onClick={() => navigate("/cadastrarVersao")}
						>
							<Plus />
							Adicionar Versao
						</button>
					</div>
					<section className="space-y-2">
						{normaAtual.versoes.reverse().map((versao) => (
							<VersaoCard key={versao.versao_numero} versao={versao} />
						))}
					</section>
				</section>
				
				<section className="flex flex-col gap-5 bg-white rounded-md p-5 shadow-[0px_0px_5px_5px_rgba(0,0,0,0.1)]">
					<div className="flex items-center gap-2">
						<span className="bg-red-200 p-2 rounded-full">
							<Tags />
						</span>
						<h3 className="text-lg md:text-xl font-bold">Tags</h3>
					</div>
					<div className="flex items-center gap-2">
						{normaAtual.tags?.map(t => <span key={t.id} className="p-2 bg-red text-white rounded-full">{t.nome}</span>)}
					</div>
				</section>

				<section className="flex flex-col gap-5 bg-white rounded-md p-5 shadow-[0px_0px_5px_5px_rgba(0,0,0,0.1)]">
					<div className="flex items-center gap-2">
						<span className="bg-red-200 p-2 rounded-full">
							<LinkIcon />
						</span>
						<h3 className="text-lg md:text-xl font-bold">
							Normas Relacionadas
						</h3>
						<button
							type="button"
							className="inline-flex items-center gap-1 bg-red hover:bg-red-hover text-white px-3 py-1.5 rounded-xl hover:scale-[1.02] ml-auto"
							onClick={() => {
								setMostrarRelacoes(true);
							}}
						>
							<Plus />
							Adicionar Relacão
						</button>
					</div>

					<section className="grid grid-cols-1 md:grid-cols-2 pt-5 gap-4 md:gap-5">
						{referencias.map((ref) => (
							<ReferenciaCard key={ref.id} referencia={ref} normas={normas} />
						))}

						{referencias.length === 0 && (
							<p className="font-semibold text-center col-span-2">
								Nenhuma norma relacionada
							</p>
						)}
					</section>
				</section>
			</main>

			{mostrarRelacoes && (
				<ModalReferencias
					normas={normas.filter(
						(n) =>
							n.id !== normaAtual.id &&
							!referencias.some((nf) => nf.id === n.id),
					)}
					setMostrarRelacoes={setMostrarRelacoes}
				/>
			)}
		</>
	);
}
