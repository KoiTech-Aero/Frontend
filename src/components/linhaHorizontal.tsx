import { cva, type VariantProps } from "cva";
import type { ComponentProps } from "react";

export const linhaHorizontalVariants = cva("mb-3 mt-1 mx-2 p-0", {
	variants: {
		color: {
			muted: "text-white/50",
		},
	},
	defaultVariants: {
		color: "muted",
	},
});

interface LinhaHorizontalProps
	extends VariantProps<typeof linhaHorizontalVariants>,
		Omit<ComponentProps<"hr">, "color"> {}

export default function LinhaHorizontal({
	color,
	className,
	...props
}: LinhaHorizontalProps) {
	return (
		<hr className={linhaHorizontalVariants({ color, className })} {...props} />
	);
}
