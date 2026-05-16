import { useContext } from "react";
import { useLocation } from "react-router";

import { AuthContext } from "../../context/AuthContext";

import type { menuItemData } from "../../types/menuItemData";

import { temPermissao } from "../../utils/temPermissao";

import LinhaHorizontal from "../linhaHorizontal";
import MenuItem from "./menuItem";
import Text from "../text";

interface MenuSecaoProps {
  titulo: string;
  itens: menuItemData[];
  open: boolean;
}

export default function MenuSecao({ titulo, itens, open }: MenuSecaoProps) {
  const { usuario } = useContext(AuthContext);

  const location = useLocation();

  return (
    <section>
      <LinhaHorizontal />

      <Text
        as="h1"
        className={`${!open ? "lg:hidden" : "lg:block"} my-3 mx-auto`}
        isTitle
      >
        {titulo}
      </Text>

      {itens.map((item, index) => {
        if (!temPermissao(usuario, item.permissao)) {
          return null;
        }

        return (
          <MenuItem
            key={`${index}-${item.children}`}
            icon={item.icon}
            endpoint={item.endpoint}
            open={open}
            select={location.pathname === item.endpoint}
          >
            {item.children}
          </MenuItem>
        );
      })}
    </section>
  );
}
