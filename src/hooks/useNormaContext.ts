import { useContext } from "react";
import { NormaContext } from "../context/NormaContext";

export const useNormaContext = () => {
	const normaContext = useContext(NormaContext);

	if (!normaContext) throw new Error("Contexto vazio");

	return normaContext;
};
