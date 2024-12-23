import type { APIContext } from "astro";

export async function POST(context: APIContext): Promise<Response> {
  // Leer los datos del formulario
  const formData = await context.request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  // Validar los datos
  if (typeof email !== "string" || typeof password !== "string") {
    return new Response(null, {
      status: 302,
      headers: {
        "Location": "src/pages/node/login?error=Datos inválidos",
      },
    });
  }

  // Crear el payload para enviar al backend
  let loginData = {
    email: email,
    password: password,
  };

  // Enviar la solicitud a tu API de Node.js para verificar el usuario
  const response = await fetch('https://nodejs-eshop-api-course-2c70.onrender.com/api/v1/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginData)
  });

  // Manejar la respuesta
  if (response.ok) {
    const responseData = await response.json();
    const { token } = responseData;
    
    // Guardar el token en las cookies
    context.cookies.set("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", path: "/" });
    
    return context.redirect("/");
  } else {
    const errorText = await response.text();
    return new Response(null, {
      status: 302,
      headers: {
        "Location": `/node/login?error=${encodeURIComponent(errorText)}`,
      },
    });
  }
}
