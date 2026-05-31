import { History, InfoIcon } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Badge from "../components/badge";
import type { Versao } from "../types/norma";

export default function VisualizarVersao() {
	const location = useLocation()
	const versao = location.state.versao as Versao;
	const data_publicacao = new Date(versao.data_publicacao).toLocaleDateString();
	const navigate = useNavigate();
	const [openPdf, setOpenPdf] = useState(false);

	return (
		<>
			<section className="max-w-6xl w-full h-max px-6 my-3 mx-auto flex flex-col gap-5">
				<section className="flex flex-col gap-1 relative
				">
					<Badge point variant={versao.status ? "verde" : "vermelho"} className="w-fit">
						{versao.status ? "Revisada" : "Datada"}
					</Badge>
					<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
						{versao.versao_numero}
					</h1>
				</section>

				<section className="flex flex-col gap-5 bg-white rounded-md p-5 shadow-[0px_0px_5px_5px_rgba(0,0,0,0.1)]">
					<div className="flex items-center gap-2">
						<span className="bg-red-200 p-2 rounded-full">
							<InfoIcon />
						</span>
						<h3 className="text-lg md:text-xl font-bold">Descrição</h3>
					</div>
					<p className="border rounded-xl p-3 md:p-4 lg:p-5 border-gray-300 bg-gray-100 font-medium">
						{versao.descricao}
					</p>
				</section>

				<section className="flex flex-col gap-5 bg-white rounded-md p-5 shadow-[0px_0px_5px_5px_rgba(0,0,0,0.1)]">
					<div className="flex items-center gap-2">
						<span className="bg-red-200 p-2 rounded-full">
							<History />
						</span>
						<h3 className="text-lg md:text-xl font-bold">Data Da Publicação</h3>
					</div>
					<p className="border rounded-xl p-3 md:p-4 lg:p-5 border-gray-300 bg-gray-100 font-medium">
						{data_publicacao}
					</p>
				</section>

					<section className="ml-auto space-x-2">
						<button
							type="button"
							onClick={() => setOpenPdf(true)}
							className="mt-4 w-full md:w-fit bg-red text-white font-bold px-4 py-2 rounded-md hover:bg-red-hover cursor-pointer"
						>
							Visualizar Documento
						</button>
						<button
							type="button"
							className="w-full md:w-auto rounded-md px-4 py-2 border border-black hover:bg-gray-200 cursor-pointer"
							onClick={() => navigate("/visualizarNorma")}
						>
							VOLTAR
						</button>
					</section>
			</section>

			{/* MODAL PDF */}
			{openPdf && (
				<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 md:p-6">
					<div className="bg-white w-full h-full md:h-[90vh] md:max-w-5xl rounded-lg flex flex-col">
						{/* HEADER MODAL */}
						<div className="flex justify-between items-center p-3 border-b">
							<h2 className="font-bold">Documento da Norma</h2>
							<button
								type="button"
								onClick={() => setOpenPdf(false)}
								className="text-gray-500 hover:text-black cursor-pointer"
							>
								Fechar
							</button>
						</div>

						{/* PDF */}
						<iframe
							title="pdf-versao"
							src={`${import.meta.env.VITE_SERVER_URL}${versao.path_file}`}
							className="w-full flex-1"
						/>
					</div>
				</div>
			)}
		</>
	);
}
