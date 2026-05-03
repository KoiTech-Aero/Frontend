import { cva, type VariantProps } from "cva";
import type { ComponentProps } from "react";

export const iconVariants = cva("", {
	variants: {
		size: {
			sm: "w-5 h-5",
		},
	},
	defaultVariants: {
		size: "sm",
	},
});

interface IconProps
	extends ComponentProps<"svg">,
		VariantProps<typeof iconVariants> {
	svg: React.FC<React.ComponentProps<"svg">>;
}

export default function Icon({
	svg: SvgComponent,
	size,
	className,
	...props
}: IconProps) {
	return (
		<SvgComponent
			className={iconVariants({ size, className })}
			{...props}
		></SvgComponent>
	);
}
