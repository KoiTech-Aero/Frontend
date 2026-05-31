import { type ReactNode, useEffect, useState } from "react";
import z from "zod";
import { NormaContext } from "../context/NormaContext";
import { NormaSchema, type Norma } from "../types/norma";
import { type Referencia, referenciaSchema } from "../types/referencia";

interface NormaProviderProps {
	children: ReactNode;
}

export function NormaProvider({ children }: NormaProviderProps) {
	const [normaAtual, setNormaAtual] = useState<Norma | null>(null);
	const [referencias, setReferencias] = useState<Referencia[]>([]);

	useEffect(() => {
		const normaSTR = localStorage.getItem("norma");

		if (normaSTR) {
			setNormaAtual(NormaSchema.parse(JSON.parse(normaSTR)));
		}
	},[])

	async function fetchReferencias() {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_SERVER_URL}/normas/${normaAtual?.id}/referencias`,
			);

			if (!response.ok) throw new Error("Erro ao buscar referências");

			const responseJSON = await response.json();

			const { data, success } = z
				.array(referenciaSchema)
				.safeParse(responseJSON);

			if (!success) throw new Error("Erro ao buscar referências");

			setReferencias(
				data.map((d) => ({
					id: d.id,
					codigo: d.codigo,
					titulo: d.titulo,
				})),
			);
		} catch (err) {
			console.error(err);
		}
	}

	function adicionaReferencia(referenciaList: Referencia[]) {
		const requestBody = referenciaList.map(r => ({id_norma_referenciada: r.id}))

		try {
			fetch(
				`${import.meta.env.VITE_SERVER_URL}/normas/${normaAtual?.id}/associar`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						referencias: requestBody,
					}),
				},
			);
		} catch (err) {
			console.error(err);
		}

		setReferencias((prev) => [...prev, ...referenciaList
		]);
	}

	function deleteReferencia(referenciaId: string) {
		setReferencias((prev) => prev.filter((r) => r.id !== referenciaId));

		fetch(
			`${import.meta.env.VITE_SERVER_URL}/normas/${normaAtual?.id}/desassociar/${referenciaId}`,
			{
				method: "DELETE",
			},
		);
	}

	return (
		<NormaContext.Provider
			value={{
				normaAtual,
				setNormaAtual,
				referencias,
				fetchReferencias,
				adicionaReferencia,
				deleteReferencia,
			}}
		>
			{children}
		</NormaContext.Provider>
	);
}
