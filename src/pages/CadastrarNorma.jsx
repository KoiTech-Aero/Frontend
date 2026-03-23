export default function CadastrarNorma() {
  return (
    <div className="overflow-y-auto w-[90%] flex flex-col rounded-2xl bg-amber-50">
      {/* Header */}
      <div className="m-5 flex flex-col">
        <h1 className="text-3xl font-bold">Cadastro de Norma</h1>
        <h2 className="text-md">Informe os detalhes técnicos para registro.</h2>
      </div>

      <hr className="border-2 border-gray-300" />

      {/* Campos */}
      <div className="m-10 flex flex-col gap-5">
        <div className="flex justify-between items-center gap-x-30">
          <div className="w-full">
            <h1>Código da Norma</h1>
            <input
              className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100 transition duration-1000 ease-in-out hover:bg-gray-200"
              type="text"
              placeholder="Ex.: ISO-9001"
            />
          </div>
          <div className="w-full">
            <h1>Área</h1>
            <select className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100 cursor-pointer transition duration-1000 ease-in-out hover:bg-gray-200">
              <option disabled selected hidden>
                Selecione...
              </option>
            </select>
          </div>
        </div>
        <div className="flex justify-between items-center gap-x-30">
          <div className="w-full">
            <h1>Título da Norma</h1>
            <input
              className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100 transition duration-1000 ease-in-out hover:bg-gray-200"
              type="text"
              placeholder="Ex.: ISO-9001"
            />
          </div>
          <div className="w-full">
            <h1>Arquivo .pdf</h1>
            <div className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100 border-dotted cursor-pointer text-center transition duration-1000 ease-in-out hover:bg-gray-200">
              <p>+</p>
            </div>
          </div>
        </div>

        <div>
          <h1>Escopo</h1>
          <textarea className="w-full border-4 rounded-md p-2 border-gray-300 bg-gray-100 transition duration-1000 ease-in-out hover:bg-gray-200"></textarea>
        </div>

        <div className="flex justify-between gap-x-10">
          <button className="w-125 bg-blue-600 text-white font-bold rounded-md cursor-pointer transition duration-1000 ease-in-out hover:bg-blue-700">
            Salvar Norma no Sistema
          </button>
          <button className="w-50 border-4 rounded-md p-1 border-gray-300 bg-gray-100 cursor-pointer transition duration-1000 ease-in-out hover:bg-gray-200">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
