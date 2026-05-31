export async function loginRequest(email: string, senha: string) {
	const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, senha }),
	});

	let data = null;

	try {
		data = await response.json();
	} catch (e) {
		console.log(e);
	}

	if (!response.ok) {
		throw new Error(data?.erro || "Erro ao fazer login");
	}

	return data;
}
