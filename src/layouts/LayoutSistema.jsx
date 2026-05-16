import { Outlet } from "react-router";
import Header from "../components/Header";
import MenuLateral from "../components/menuLateral";

export default function LayoutSistema() {
	return (
		<div className="flex h-screen bg-gray-100">
			<MenuLateral />

			<div className="flex flex-col w-full">
				<Header />

				<div className="flex-1 overflow-hidden">
					<div className="h-full overflow-y-auto flex flex-col items-center gap-5">
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
}
