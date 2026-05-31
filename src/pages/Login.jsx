import { useState, useContext } from "react";
import { useNavigate } from "react-router";

import { Plane, Lock, Mail } from "lucide-react";

import { AuthContext } from "../context/AuthContext";
import { loginRequest } from "../services/api";

import InputField from "../components/form/inputField";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const data = await loginRequest(email, senha);

      login(data.usuario, data.token);
      navigate("/pesquisarNorma");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div className="flex min-h-screen w-full bg-[#140A11]">
      {/* ESQUERDA */}
      <div className="relative hidden w-[40%] overflow-hidden border-r border-white/10 bg-linear-to-br from-[#140A11] via-[#2B1020] to-[#621E33] lg:flex">
        {/* BLUR-1 */}
        <div className="absolute left-30 top-30 h-80 w-[320px] rounded-full bg-[#8B2E4A]/20 blur-3xl" />

        {/* BLUR-2 */}
        <div className="absolute bottom-30 right-30 h-80 w-[320px] rounded-full bg-[#A63A5C]/10 blur-3xl" />

        <div className="relative z-10 flex w-full items-center justify-center px-12">
          <div className="flex max-w-md flex-col items-start">
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/10 backdrop-blur-sm">
                <Plane className="text-white" size={30} />
              </div>

              <div>
                <h1 className="text-3xl font-bold text-white">KoiTech Aero</h1>

                <p className="mt-1 text-sm text-white/70">
                  Controle Técnico de Normas Aeronáuticas
                </p>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-5xl font-bold leading-tight text-white">
                Sua solução para controle de normas
              </h2>

              <p className="mt-10 text-md leading-relaxed text-white/70">
                Gerencie, rastreie e consulte normas técnicas aeronáuticas.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* DIREITA */}
      <div className="flex w-full items-center justify-center bg-[#F8F5F7] p-6 lg:w-[60%]">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-2xl"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#2B1020]">Login</h1>
          </div>

          <div className="mb-5 flex flex-col gap-2">
            <InputField
              label="Email"
              icon={<Mail size={18} />}
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#621E33] focus:ring-4 focus:ring-[#621E33]/10"
            />
          </div>

          <div className="mb-8 flex flex-col gap-2">
            <InputField
              label="Senha"
              icon={<Lock size={18} />}
              type="password"
              value={senha}
              required
              onChange={(e) => setSenha(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#621E33] focus:ring-4 focus:ring-[#621E33]/10"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-xl bg-[#621E33] py-3 font-semibold text-white shadow-lg shadow-[#621E33]/20 transition-all duration-300 hover:scale-[1.01] hover:bg-[#4E1728] active:scale-[0.99]"
          >
            Entrar no Sistema
          </button>

          <p className="mt-6 text-center text-sm text-gray-400">
            Sistema interno para gestão de normas
          </p>
        </form>
      </div>
    </div>
  );
}
