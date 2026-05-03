import { cva, type VariantProps } from "cva";
import { type ComponentProps, createElement } from "react";

export const textVariants = cva("max-w-fit max-h-fit m-0 p-0 leading-none", {
	variants: {
		variant: {
			sm: "text-[14px] font-normal font-mono",
		},
		color: {
			muted: "text-white/50",
		},
		isTitle: {
			true: "uppercase",
		},
	},
	defaultVariants: {
		variant: "sm",
		color: "muted",
		isTitle: false,
	},
});

interface TextProps
	extends VariantProps<typeof textVariants>,
		Omit<ComponentProps<"span">, "color" | "title"> {
	as?: keyof React.JSX.IntrinsicElements;
}

export default function Text({
	as = "span",
	variant,
	color,
	isTitle,
	className,
	children,
	...props
}: TextProps) {
	return createElement(
		as,
		{
			className: textVariants({
				variant,
				isTitle,
				color,
				className,
			}),
			...props,
		},
		children,
	);
}
