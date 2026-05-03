import { Outlet } from "react-router";
import Header from "../components/Header";
import MenuLateral from "../components/menuLateral";

export default function LayoutSistema() {
	return (
		<div className="flex h-screen bg-gray-200">
			<MenuLateral />

			<div className="flex flex-col w-full">
				<Header />

				<div className="flex-1 overflow-hidden">
					<div className="h-full overflow-y-auto py-20 flex flex-col items-center gap-5">
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
}
