interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium
			${
        status === "Pendente"
          ? "bg-yellow-100 text-yellow-700"
          : status === "Aprovado"
            ? "bg-green-100 text-green-700"
            : status === "Recusado"
              ? "bg-red-100 text-red-700"
              : "bg-gray-100 text-gray-700"
      }
		`}
    >
      {status}
    </span>
  );
}
