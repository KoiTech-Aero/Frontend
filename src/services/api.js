const BASE_URL = "http://localhost:3000";

export async function loginRequest(email, senha) {
  const response = await fetch(`${BASE_URL}/login`, {
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
