interface UsuarioStatusBadgeProps {
  status: boolean;
}

export default function UsuarioStatusBadge({
  status,
}: UsuarioStatusBadgeProps) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold
			${status ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}
		`}
    >
      {status ? "Ativo" : "Inativo"}
    </span>
  );
}
