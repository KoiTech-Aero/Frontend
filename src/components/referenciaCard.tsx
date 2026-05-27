import { Forward, Link2Icon, X } from "lucide-react";
import type { Referencia } from "../types/referencia";

interface ReferenciaCardProps {
	referencia: Referencia;
}

export default function ReferenciaCard({ referencia }: ReferenciaCardProps) {
	function redirectNormaReferencia(_id: string): void {
		throw new Error("Function not implemented.");
	}

	return (
		<div
			key={referencia.id}
			className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 border border-gray-300 hover:border-red p-3 rounded-2xl transition-colors"
		>
			<div className="flex flex-wrap items-center gap-2">
				<span className="bg-red-200 p-2 rounded-xl">
					<Link2Icon />
				</span>
				<div className="flex flex-col justify-center leading-4">
					<span className="font-normal">{referencia.titulo}</span>
					<span className="text-xs text-black/50">{referencia.codigo}</span>
				</div>
			</div>

			<div className="flex items-center gap-1">
				<button
					type="button"
					onClick={() => redirectNormaReferencia(referencia.id)}
					className="rounded-full p-1 hover:bg-red-hover transition-colors group"
				>
					<Forward
						className="group-hover:text-white transition-colors"
						size={"15px"}
					/>
				</button>
				<button
					type="button"
					onClick={() => redirectNormaReferencia(referencia.id)}
					className="rounded-full p-1 hover:bg-red-hover transition-colors group"
				>
					<X
						className="group-hover:text-white transition-colors"
						size={"15px"}
					/>
				</button>
			</div>
		</div>
	);
}
