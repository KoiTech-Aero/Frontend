import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { itensAdmin, itensMenu } from "../utils/itensMenu";
import DesktopSidebar from "./menu/desktopSidebar";
import MobileBottomBar from "./menu/mobileBottombar";
import MobileModal from "./menu/mobileModal";

export default function MenuLateral() {
	const [open, setOpen] = useState(true);
	const [openMore, setOpenMore] = useState(false);

	const { usuario, logout } = useContext(AuthContext);

	const navigate = useNavigate();
	const location = useLocation();

	if (!usuario) return null;

	const isActive = (path: string) => location.pathname === path;

	function handleLogout() {
		logout();
		navigate("/");
	}

	return (
		<>
			<DesktopSidebar
				open={open}
				onToggle={() => setOpen((p) => !p)}
				itensMenu={itensMenu}
				itensAdmin={itensAdmin}
			/>

			<MobileBottomBar
				usuario={usuario}
				isActive={isActive}
				onOpenMore={() => setOpenMore(true)}
			/>

			<MobileModal
				open={openMore}
				setOpen={setOpenMore}
				usuario={usuario}
				onLogout={handleLogout}
			/>
		</>
	);
}
