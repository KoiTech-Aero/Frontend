import { cva, type VariantProps } from "cva";
import type { ComponentProps } from "react";

export const badgeVariants = cva(
	"rounded-full text-xs font-medium font-mono uppercase inline-flex items-center gap-1",
	{
		variants: {
			variant: {
				neutro: "bg-gray-100 text-gray-700",
				vermelho: "bg-red-100 text-red-700",
				amarelo: "bg-yellow-100 text-yellow-700",
				verde: "bg-green-100 text-green-700",
				azul: "bg-blue-100 text-blue-700",
			},
			size: {
				none: "p-0 leading-0",
				md: "px-3 py-1",
			},
			noBG: {
				true: "bg-transparent",
			},
		},
		defaultVariants: {
			variant: "neutro",
			size: "md",
			noBG: false,
		},
	},
);

export const badgeCicleVariants = cva("inline-block w-2 h-2 rounded-full ", {
	variants: {
		variant: {
			neutro: "bg-gray-500 ",
			vermelho: "bg-red-500",
			amarelo: "bg-yellow-500",
			verde: "bg-green-500",
			azul: "bg-blue-500",
		},
	},
	defaultVariants: {
		variant: "neutro",
	},
});

interface BagdeProps
	extends VariantProps<typeof badgeVariants>,
		ComponentProps<"span"> {
	point?: boolean;
}

export default function Bagde({
	point,
	variant,
	size,
	noBG,
	children,
	className,
}: BagdeProps) {
	return (
		<span className={badgeVariants({ className, variant, size, noBG })}>
			{point && <span className={badgeCicleVariants({ variant })}></span>}
			{children}
		</span>
	);
}
