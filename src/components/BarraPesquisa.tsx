import { Search } from "lucide-react";
import {
	type ChangeEvent,
	type Dispatch,
	type SetStateAction,
	useEffect,
	useState,
} from "react";
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
	const [busca, setBusca] = useState("");

	function handleSearch(e: ChangeEvent<HTMLInputElement>) {
		const valorBusca = e.target.value;
		setBusca(valorBusca);

		if (busca.length === 0 || busca.trim() === "") {
			setNormasFiltradas(normas);
			return;
		}

		setNormasFiltradas(
			normas.filter(
				(norma) =>
					norma.titulo.toLowerCase().includes(busca.toLowerCase()) ||
					norma.codigo.toLowerCase().includes(busca.toLowerCase()) ||
					norma.area_tecnica.toLowerCase().includes(busca.toLowerCase()) ||
					norma.orgao_emissor.toLowerCase().includes(busca.toLowerCase()),
			),
		);
	}

	useEffect(() => {
		console.log(busca);
	}, [busca]);

	return (
		<div className="w-full flex items-center gap-5">
			<div className="w-full bg-white rounded-md py-2 px-4 border border-gray-300 text-[rgba(0, 0, 0, 0.5)] flex gap-2 items-center">
				<label htmlFor="Search">
					<Search color="rgba(0, 0, 0, 0.5)" />
				</label>
				<input
					id="Search"
					type="text"
					onChange={(e) => handleSearch(e)}
					placeholder="Pesquisar..."
					className="focus:outline-none opacity-100"
				/>
			</div>

			<input
				type="date"
				className="bg-white rounded-md py-2 px-4 border border-gray-300 flex gap-2 items-center focus:outline-none"
			/>

			<TagsSearch />
		</div>
	);
}
