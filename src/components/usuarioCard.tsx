import { LogOut } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function UsuarioCard() {
	const { usuario, logout } = useContext(AuthContext);
	const navigate = useNavigate();

	function handleLogout() {
		logout();
		navigate("/login");
	}

	const btnLogout =
		"w-fit h-10 mt-5 flex items-center gap-2 cursor-pointer bg-red-500 p-4 rounded-xl text-white font-bold transition duration-300 hover:bg-red-600";

	return (
		<div className="absolute bottom-0 p-6 rounded-xl text-white">
			<p className="font-bold">{usuario?.nome}</p>
			<p className="text-sm opacity-70">{usuario?.role}</p>

			<button type="button" onClick={handleLogout} className={btnLogout}>
				<LogOut />
				Sair
			</button>
		</div>
	);
}
