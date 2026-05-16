import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

import DesktopSidebar from "./menu/desktopSidebar";
import MobileBottomBar from "./menu/mobileBottombar";
import MobileModal from "./menu/mobileModal";

import { itensMenu, itensAdmin } from "../utils/itensMenu";

export default function menuLateral() {
  const [open, setOpen] = useState(true);
  const [openMore, setOpenMore] = useState(false);

  const { usuario, logout } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

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