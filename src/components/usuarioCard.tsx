import { LogOut } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface UsuarioCardProps {
	open: boolean;
}

export default function UsuarioCard({ open }: UsuarioCardProps) {
	const { usuario, logout } = useContext(AuthContext);
	const navigate = useNavigate();

	function handleLogout() {
		logout();
		navigate("/login");
	}

	const btnLogout = `w-fit h-10 mt-5 flex items-center gap-2 cursor-pointer  ${open && "bg-red-500 p-4"} rounded-xl text-white font-bold transition duration-300 hover:bg-red-600`;

	return (
		<div className={`mt-auto ${open ? " p-6" : " p-3"} rounded-xl text-white`}>
			{open && (
				<>
					<p className="font-bold">{usuario?.nome}</p>
					<p className="text-sm opacity-70">{usuario?.role}</p>
				</>
			)}

			<button type="button" onClick={handleLogout} className={btnLogout}>
				<LogOut />
				{open && "Sair"}
			</button>
		</div>
	);
}
