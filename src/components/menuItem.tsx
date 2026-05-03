import type { ComponentProps, FC } from "react";
import { Link } from "react-router";
import Text from "./text";

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
			className={`flex items-center gap-2 p-3 hover:bg-red-hover ${select && "bg-red-dark hover:bg-red-dark!"}`}
			{...props}
		>
			<SvgComponet color="white" />
			<Text className={`${!open ? "lg:hidden" : "lg:inline-block"} lg:mr-8`}>
				{children}
			</Text>
		</Link>
	);
}
