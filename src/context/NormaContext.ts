import { createContext, type Dispatch, type SetStateAction } from "react";
import type { Norma } from "../types/norma";
import type { Referencia } from "../types/referencia";

interface NormaContextProps {
	normaAtual: Norma | null;
	setNormaAtual: Dispatch<SetStateAction<Norma | null>>;
	referencias: Referencia[];
	fetchReferencias: () => Promise<void>;
	adicionaReferencia: (normaReferencia: Referencia[]) => void;
	deleteReferencia: (referenciaId: string) => void;
}

export const NormaContext = createContext<NormaContextProps | null>(null);
