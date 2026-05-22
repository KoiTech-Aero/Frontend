import { useContext, useEffect, useMemo, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

import {
	buscarUsuarioPorId,
	editarUsuario,
	listarUsuarios,
} from "../services/usuarioService";

import type { cadastrarUsuarioForm } from "../types/cadastrarUsuarioForm";

export function useEditarUsuario() {
	const { id } = useParams();

	const navigate = useNavigate();

	const { usuario, updateUsuario } = useContext(AuthContext);

	const [loading, setLoading] = useState(true);

	const [originalUser, setOriginalUser] = useState<any>(null);

	const [formData, setFormData] = useState<cadastrarUsuarioForm>({
		nome: "",
		email: "",
		senha: "",
		confirmarSenha: "",
		role: "",
		status: "",
	});

	const isSelfEdit = usuario?.id === id;

	useEffect(() => {
		async function carregarUsuario() {
			try {
				if (!id) return;

				const data = await buscarUsuarioPorId(id);

				setOriginalUser(data);

				setFormData({
					nome: "",
					email: "",
					senha: "",
					confirmarSenha: "",
					role: data.role,
					status: String(data.status),
				});
			} catch (error) {
				console.error(error);
				alert("Erro ao carregar usuário");
			} finally {
				setLoading(false);
			}
		}

		carregarUsuario();
	}, [id]);

	function updateField<K extends keyof cadastrarUsuarioForm>(
		field: K,
		value: cadastrarUsuarioForm[K],
	) {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	}

	const houveMudanca = useMemo(() => {
		if (!originalUser) return false;

		return (
			formData.nome.trim() !== "" ||
			formData.email.trim() !== "" ||
			formData.senha.trim() !== "" ||
			formData.role !== originalUser.role ||
			String(formData.status) !== String(originalUser.status)
		);
	}, [formData, originalUser]);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!id || !originalUser) return;

		try {
			if (!houveMudanca) {
				throw new Error("Nenhuma alteração foi feita.");
			}

			const usuarios = await listarUsuarios();

			if (formData.email.trim()) {
				const emailExiste = usuarios.some(
					(user: { id: string; email: string }) =>
						user.email === formData.email && user.id !== id,
				);

				if (emailExiste) {
					throw new Error("Já existe um usuário cadastrado com este e-mail.");
				}
			}

			const body: Partial<cadastrarUsuarioForm> = {};

			if (formData.nome.trim()) {
				body.nome = formData.nome;
			}

			if (formData.email.trim()) {
				body.email = formData.email;
			}

			if (formData.senha.trim()) {
				if (formData.senha !== formData.confirmarSenha) {
					throw new Error("As senhas não coincidem!");
				}

				if (formData.senha.length < 6) {
					throw new Error("A senha deve possuir no mínimo 6 caracteres");
				}

				body.senha = formData.senha;
			}

			if (!isSelfEdit) {
				if (formData.role !== originalUser.role) {
					body.role = formData.role;
				}

				if (String(formData.status) !== String(originalUser.status)) {
					body.status = formData.status === "true";
				}
			}

			const updatedUser = await editarUsuario(id, body);

			if (usuario?.id === id) {
				updateUsuario(updatedUser);
			}

			setOriginalUser(updatedUser);

			setFormData({
				nome: "",
				email: "",
				senha: "",
				confirmarSenha: "",
				role: updatedUser.role,
				status: String(updatedUser.status),
			});

			alert("Usuário atualizado com sucesso!");
		} catch (error) {
			console.error(error);

			if (error instanceof Error) {
				alert(error.message);
				return;
			}

			alert("Erro ao atualizar usuário.");
		}
	}

	return {
		originalUser,
		formData,
		updateField,
		handleSubmit,
		isSelfEdit,
		houveMudanca,
		loading,
		navigate,
	};
}
