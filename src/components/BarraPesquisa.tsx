import { Search } from "lucide-react";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import type { Norma } from "../types/norma";
import TagsSearch from "./tagsSearch";

interface BarraPesquisaProps {
	normas: Norma[];
	setNormasFiltradas: Dispatch<SetStateAction<Norma[]>>;
}

export default function BarraPesquisa({
	normas,
	setNormasFiltradas,
}: BarraPesquisaProps) {
	function handleSearch(e: ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;

		const valorBusca =
			name === "data" && value !== "" ? new Date(value).toISOString() : value;

		if (valorBusca.trim() === "" || valorBusca === "") {
			setNormasFiltradas(normas);
			return;
		}

		setNormasFiltradas(
			normas.filter(
				(norma) =>
					norma.titulo.toLowerCase().includes(valorBusca.toLowerCase()) ||
					norma.codigo.toLowerCase().includes(valorBusca.toLowerCase()) ||
					norma.area_tecnica.toLowerCase().includes(valorBusca.toLowerCase()) ||
					norma.orgao_emissor
						.toLowerCase()
						.includes(valorBusca.toLowerCase()) ||
					norma.versoes.some(
						(v) =>
							name === "data" &&
							new Date(v.data_publicacao).toISOString() ===
								new Date(valorBusca).toISOString(),
					),
			),
		);
	}

	return (
		<div className="w-full flex items-center gap-5">
			<div className="w-full bg-white rounded-md py-2 px-4 border border-gray-300 text-[rgba(0, 0, 0, 0.5)] flex gap-2 items-center">
				<label htmlFor="Search">
					<Search color="rgba(0, 0, 0, 0.5)" />
				</label>
				<input
					id="Search"
					name="nome"
					type="text"
					onChange={(e) => handleSearch(e)}
					placeholder="Pesquisar..."
					className="focus:outline-none opacity-100 w-full"
				/>
			</div>

			<input
				id="data"
				name="data"
				type="date"
				onChange={handleSearch}
				className="bg-white rounded-md py-2 px-4 border border-gray-300 flex gap-2 items-center focus:outline-none"
			/>

			<TagsSearch />
		</div>
	);
}
