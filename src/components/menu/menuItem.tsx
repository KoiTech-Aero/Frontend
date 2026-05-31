import type { ComponentProps, FC } from "react";

import { Link } from "react-router";

import Text from "../text";

interface MenuItemProps extends Omit<ComponentProps<typeof Link>, "to"> {
  icon: FC<ComponentProps<"svg">>;
  endpoint: string;
  children: string;
  select?: boolean;
  open: boolean;
}

export default function MenuItem({
  icon: SvgComponet,
  children,
  endpoint,
  select,
  open,
  ...props
}: MenuItemProps) {
  return (
    <Link
      to={endpoint}
      className={`
        flex items-center gap-3 p-3 rounded-xl transition-all duration-200
        ${select ? "bg-red-dark text-white" : "hover:bg-red-hover text-white"}
        ${!open ? "justify-center" : ""}
      `}
      {...props}
    >
      <SvgComponet />

      <Text className={`${!open ? "hidden" : "inline-block"} lg:mr-8`}>
        {children}
      </Text>
    </Link>
  );
}
