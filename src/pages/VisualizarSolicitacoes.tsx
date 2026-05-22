import SolicitacaoModal from "../components/solicitacoes/solicitacaoModal";

import SolicitacaoRow from "../components/solicitacoes/solicitacaoRow";

import { useVisualizarSolicitacoesNormas } from "../hooks/useVisualizarSolicitacoes";

export default function VisualizarSolicitacoes() {
  const {
    solicitacoes,
    usuarios,
    modal,
    solicitacaoSelecionada,
    usuarioLogado,
    navigate,
    abrirModal,
    fecharModal,
    solicitacaoPendente,
    permissaoCadastro,
    atualizarStatus,
  } = useVisualizarSolicitacoesNormas();

  return (
    <div className="w-full h-[calc(95vh-80px)] flex justify-center px-6 py-5">
      <section className="w-full max-w-7xl flex flex-col rounded-xl overflow-hidden border border-black/10 bg-white shadow-[0px_0px_5px_0px_rgba(0,0,0,0.15)]">
        <div className="hidden md:grid md:grid-cols-[2fr_1.2fr_140px_140px_120px] gap-4 bg-zinc-100 border-b border-black/10 px-5 py-4 font-bold text-black/60 font-mono tracking-wide uppercase text-sm shrink-0">
          <h1>Título</h1>

          <h1>Autor</h1>

          <h1>Data</h1>

          <h1>Status</h1>

          <h1 className="text-center">Detalhes</h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          {solicitacoes.map((solicitacao) => (
            <SolicitacaoRow
              key={solicitacao.id}
              solicitacao={solicitacao}
              autor={usuarios[solicitacao.usuario.id] || "Carregando..."}
              onDetails={() => abrirModal(solicitacao)}
            />
          ))}
        </div>
      </section>

      {modal && solicitacaoSelecionada && (
        <SolicitacaoModal
          solicitacao={solicitacaoSelecionada}
          autor={usuarios[solicitacaoSelecionada.usuario.id] || "Carregando..."}
          onClose={fecharModal}
          onApprove={() => atualizarStatus("Aprovado")}
          onReject={() => atualizarStatus("Recusado")}
          onCadastrarNorma={() =>
            navigate("/cadastrarNorma", {
              state: {
                solicitacaoSelecionada,
              },
            })
          }
          showActions={solicitacaoPendente(solicitacaoSelecionada.status)}
          showCadastrar={permissaoCadastro(
            solicitacaoSelecionada.status,
            usuarioLogado,
          )}
        />
      )}
    </div>
  );
}
