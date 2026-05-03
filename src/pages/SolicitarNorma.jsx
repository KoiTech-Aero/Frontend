import { useState } from "react";
import { FileText } from "lucide-react";

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

        setFormData({
          titulo: "",
          motivo: "",
          codigo_norma: "",
          versao_norma: "",
          orgao_emissor: "",
        });

        alert("Norma solicitada com sucesso!");
      })
      .catch((err) => {
        console.error("Erro:", err);
      });
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex justify-center">
      <div className="w-full max-w-3xl bg-amber-50 rounded-2xl flex flex-col">
        {/* HEADER */}
        <div className="m-5 flex flex-col">
          <h1 className="text-3xl font-bold">Solicitação de Norma</h1>
          <h2 className="text-md text-gray-500">
            Informe os dados para abrir um ticket de solicitação
          </h2>
        </div>

        <hr className="border-2 border-gray-200" />

        {/* FORM */}
        <div className="p-4 md:p-8 flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {/* TÍTULO */}
            <div className="md:col-span-2">
              <label className="text-sm font-semibold">Título *</label>
              <input
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                className="w-full mt-1 border-4 border-gray-300 rounded-md p-2 bg-gray-100"
                type="text"
                required
              />
            </div>

            {/* MOTIVO */}
            <div className="md:col-span-2">
              <label className="text-sm font-semibold">Motivo *</label>
              <textarea
                name="motivo"
                value={formData.motivo}
                onChange={handleChange}
                className="w-full mt-1 border-4 border-gray-300 rounded-md p-2 bg-gray-100 min-h-25 resize-none"
                required
              />
            </div>

            {/* CÓDIGO */}
            <div>
              <label className="text-sm font-semibold">Código da Norma</label>
              <input
                name="codigo_norma"
                value={formData.codigo_norma}
                onChange={handleChange}
                className="w-full mt-1 border-4 border-gray-300 rounded-md p-2 bg-gray-100"
                type="text"
                placeholder="Ex: NBR 1234"
              />
            </div>

            {/* VERSÃO */}
            <div>
              <label className="text-sm font-semibold">Versão</label>
              <input
                name="versao_norma"
                value={formData.versao_norma}
                onChange={handleChange}
                className="w-full mt-1 border-4 border-gray-300 rounded-md p-2 bg-gray-100"
                type="text"
                placeholder="Ex: 2020"
              />
            </div>

            {/* ÓRGÃO */}
            <div className="md:col-span-2">
              <label className="text-sm font-semibold">Órgão Emissor</label>
              <input
                name="orgao_emissor"
                value={formData.orgao_emissor}
                onChange={handleChange}
                className="w-full mt-1 border-4 border-gray-300 rounded-md p-2 bg-gray-100"
                type="text"
                placeholder="Ex: ABNT"
              />
            </div>
          </div>

          {/* BOTÃO */}
          <button
            type="submit"
            className="w-full md:w-fit md:self-end bg-blue-600 text-white font-bold px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300 active:scale-[0.98] cursor-pointer"
          >
            Solicitar Norma
          </button>
        </div>
      </div>
    </form>
  );
}
