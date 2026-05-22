import UsuarioRow from "../components/usuarios/usuarioRow";

import { useVisualizarUsuarios } from "../hooks/useVisualizarUsuarios";

export default function VisualizarUsuarios() {
  const { listaFiltrada, navigate } = useVisualizarUsuarios();

  return (
    <div className="w-full h-[calc(95vh-80px)] flex justify-center px-6 py-5">
      <section className="w-full max-w-7xl flex flex-col rounded-xl overflow-hidden border border-black/10 bg-white shadow-[0px_0px_5px_0px_rgba(0,0,0,0.15)]">
        <div className="hidden md:grid md:grid-cols-[90px_1.5fr_1.7fr_140px_140px_120px] gap-4 bg-zinc-100 border-b border-black/10 px-5 py-4 font-bold text-black/60 font-mono tracking-wide uppercase text-sm shrink-0">
          <h1 className="text-center">Avatar</h1>

          <h1>Usuário</h1>

          <h1>Email</h1>

          <h1>Perfil</h1>

          <h1>Status</h1>

          <h1 className="text-center">Ações</h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          {listaFiltrada.map((usuario) => (
            <UsuarioRow
              key={usuario.id}
              usuario={usuario}
              onEdit={() => navigate(`/editarUsuario/${usuario.id}`)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
