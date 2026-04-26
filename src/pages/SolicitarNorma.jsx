import { useState } from "react";

export default function SolicitarNorma() {
  const [formData, setFormData] = useState({
    titulo: "",
    motivo: "",
    codigo_norma: "",
    versao_norma: "",
    orgao_emissor: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:3000/solicitacoes/norma", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titulo: formData.titulo,
        motivo: formData.motivo,
        codigo_norma: formData.codigo_norma || undefined,
        versao_norma: formData.versao_norma || undefined,
        orgao_emissor: formData.orgao_emissor || undefined,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Resposta:", data);

        // limpa o formulário
        setFormData({
          titulo: "",
          motivo: "",
          codigo_norma: "",
          versao_norma: "",
          orgao_emissor: "",
        });

        alert("Norma solicitada com sucesso!")
      })
      .catch((err) => {
        console.error("Erro:", err);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="overflow-y-auto w-[90%] flex flex-col rounded-2xl bg-amber-50">
        <div className="m-5 flex flex-col">
          <h1 className="text-3xl font-bold">Solicitar Norma</h1>
          <h2 className="text-md">
            Informe os dados da solicitação.
          </h2>
        </div>

        <hr className="border-2 border-gray-300" />

        <div className="m-10 flex flex-col gap-5">
          {/* TITULO */}
          <div>
            <h1>Título</h1>
            <input
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100"
              type="text"
              required
            />
          </div>

          {/* MOTIVO */}
          <div>
            <h1>Motivo</h1>
            <input
              name="motivo"
              value={formData.motivo}
              onChange={handleChange}
              className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100"
              type="text"
              required
            />
          </div>

          {/* CODIGO NORMA */}
          <div>
            <h1>Código da Norma</h1>
            <input
              name="codigo_norma"
              value={formData.codigo_norma}
              onChange={handleChange}
              className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100"
              type="text"
              placeholder="Ex: NBR 1234"
            />
          </div>

          {/* VERSAO NORMA */}
          <div>
            <h1>Versão</h1>
            <input
              name="versao_norma"
              value={formData.versao_norma}
              onChange={handleChange}
              className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100"
              type="text"
              placeholder="Ex: 2020"
            />
          </div>

          {/* ORGAO EMISSOR */}
          <div>
            <h1>Órgão Emissor</h1>
            <input
              name="orgao_emissor"
              value={formData.orgao_emissor}
              onChange={handleChange}
              className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100"
              type="text"
              placeholder="Ex: ABNT"
            />
          </div>

          {/* BOTÃO */}
          <button
            type="submit"
            className="bg-blue-600 text-white font-bold rounded-md p-2 hover:bg-blue-700"
          >
            Solicitar
          </button>
        </div>
      </div>
    </form>
  );
}