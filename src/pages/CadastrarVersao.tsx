import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import z from "zod";
import { useNormaContext } from "../hooks/useNormaContext";
import type { Versao } from "../types/norma";

interface VersaoRequest {
	id_norma: string;
	versao_numero: string;
	descricao: string;
	data_publicacao: string;
	status: boolean;
	path_file: File | null;
}

const VersaoResponseSchema = z.object({
	id_norma: z.string(),
	versao_numero: z.string(),
	descricao: z.string(),
	data_publicacao: z.string(),
	path_file: z.string(),
});

export default function CadastrarVersao() {
	const navigate = useNavigate();
	const { normaAtual, setNormaAtual } = useNormaContext();

	const [versaoData, setVersaoData] = useState<VersaoRequest>({
		id_norma: normaAtual?.codigo || "",
		versao_numero: "",
		descricao: "",
		data_publicacao: new Date().toISOString().split("T")[0],
		status: true,
		path_file: null,
	});

	useEffect(() => {
		console.log(versaoData.path_file);
	}, [versaoData.path_file]);

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		const { name, value, files } = e.target;

		if (name === "path_file" && files) {
			setVersaoData((prev) => ({ ...prev, [name]: files[0] }));
			return;
		}

		setVersaoData((prev) => ({ ...prev, [name]: value }));
	}

	if (!normaAtual) return;

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!versaoData.path_file || !normaAtual || !setNormaAtual) return;

		const formData = new FormData();

		formData.append("id_norma", versaoData.id_norma);
		formData.append("versao_numero", versaoData.versao_numero);
		formData.append("descricao", versaoData.descricao);
		formData.append("data_publicacao", versaoData.data_publicacao);
		formData.append("status", versaoData.status.toString());
		formData.append("file", versaoData.path_file);

		try {
			const response = await fetch(
				`${import.meta.env.VITE_SERVER_URL}/addVersao`,
				{
					method: "POST",
					body: formData,
				},
			);

			if (!response.ok) throw new Error("Erro na Requisição");

			const responseJSON = await response.json();

			const { data, success } = VersaoResponseSchema.safeParse(responseJSON);

			if (!success) throw new Error("Response mal formatada");

			const versaoResponse: Versao = {
				...data,
				data_publicacao: new Date(data.data_publicacao),
				status: true,
			};

			setNormaAtual((prev) =>
				prev
					? {
							...prev,
							versoes: prev.versoes
								.map((v) => ({ ...v, status: false }))
								.concat(versaoResponse),
						}
					: prev,
			);

			alert("Versão cadastrada com sucesso!");
			navigate("/visualizarNorma");
		} catch (error) {
			console.error(error);
			alert("Erro de conexão com o servidor.");
		}
	}

	return (
		<form onSubmit={handleSubmit} className="w-full flex justify-center">
			<div className="overflow-y-auto w-full max-w-3xl flex flex-col rounded-2xl bg-white">
				{/* HEADER */}
				<div className="m-5 flex flex-col">
					<h1 className="text-2xl md:text-3xl font-bold">Adicionar Versão</h1>
					<h2 className="text-md text-gray-500">
						Informe os detalhes técnicos para registro.
					</h2>
				</div>

				<hr className="border-2 border-gray-300" />

				{/* FORM */}
				<div className="m-5 md:m-10 flex flex-col gap-5">
					{/* LINHA 1 */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
						<div>
							<h1>Código da Norma</h1>
							<input
								className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100"
								disabled
								value={versaoData.id_norma}
							/>
						</div>

						<div>
							<h1>Número da versão</h1>
							<input
								name="versao_numero"
								type="text"
								className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100 hover:bg-gray-200"
								value={versaoData.versao_numero}
								onChange={handleChange}
								required
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
						<div>
							<h1>Descrição</h1>
							<input
								name="descricao"
								type="text"
								className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100 hover:bg-gray-200"
								value={versaoData.descricao}
								onChange={handleChange}
								required
							/>
						</div>

						<div>
							<h1>Data de publicação</h1>
							<input
								type="text"
								className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100"
								value={versaoData.data_publicacao}
								disabled
							/>
						</div>
					</div>

					{/* ARQUIVO */}
					<div>
						<h1>Arquivo .pdf</h1>

						<div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-5">
							<label
								htmlFor="path"
								className="cursor-pointer bg-blue-500 text-white px-3 py-2 rounded-lg font-bold text-center"
							>
								Escolher Arquivo
							</label>
							<input
								id="path"
								name="path_file"
								type="file"
								className="hidden"
								accept="application/pdf"
								onChange={handleChange}
								required
							/>

							{versaoData.path_file && (
								<p className="text-sm wrap-break-word">
									<b>Arquivo selecionado:</b> {versaoData.path_file.name}
								</p>
							)}
						</div>
					</div>

					{/* BOTÕES 75 / 25 */}
					<div className="flex flex-col md:flex-row gap-3 md:gap-5 w-full">
						<button
							type="submit"
							className="w-full md:w-[75%] bg-blue-600 text-white font-bold rounded-md py-2 hover:bg-blue-700 cursor-pointer"
						>
							Salvar Norma no Sistema
						</button>

						<button
							type="button"
							onClick={() => navigate("/visualizarNorma")}
							className="w-full md:w-[25%] border-4 rounded-md py-1 border-gray-300 bg-gray-100 hover:bg-gray-200 whitespace-nowrap cursor-pointer"
						>
							Cancelar
						</button>
					</div>
				</div>
			</div>
		</form>
	);
}
