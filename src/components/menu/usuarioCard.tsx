import { LogOut } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

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

	const btnLogout = `"w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-red hover:bg-red-hover  text-white font-bold cursor-pointer  ${open && "bg-red p-6 mt-2"} transition duration-300`;

	return (
		<div
			className={`flex flex-col mt-auto ${open ? " p-6" : " p-3"} rounded-xl text-white`}
		>
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
