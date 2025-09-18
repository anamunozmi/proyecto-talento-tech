// function showForm(formId) {
//   const forms = document.querySelectorAll(".form");
//   forms.forEach((form) => form.classList.remove("active"));
//   document.getElementById(formId).classList.add("active");

//   // Limpiar mensajes de error al cambiar
//   document
//     .querySelectorAll(".error-message")
//     .forEach((e) => (e.textContent = ""));
// }

// // Simulación de login
// document.getElementById("loginForm").addEventListener("submit", function (e) {
//   e.preventDefault();

//   const username = document.getElementById("loginUsername").value.trim();
//   const password = document.getElementById("loginPassword").value.trim();
//   const error = document.getElementById("loginError");

//   if (username === "admin" && password === "1234") {
//     error.style.color = "green";
//     error.textContent = "Login exitoso. Redirigiendo...";
//     setTimeout(() => {
//       window.location.href = "/pages/home/home.html";
//     }, 1500);
//   } else {
//     error.textContent = "Usuario o contraseña incorrectos.";
//   }
// });

// // Simulación de registro
// document
//   .getElementById("registerForm")
//   .addEventListener("submit", function (e) {
//     e.preventDefault();

//     const username = document.getElementById("registerUsername").value.trim();
//     const email = document.getElementById("registerEmail").value.trim();
//     const password = document.getElementById("registerPassword").value.trim();
//     const error = document.getElementById("registerError");

//     if (!username || !email || !password) {
//       error.textContent = "Todos los campos son obligatorios.";
//       return;
//     }

//     error.style.color = "green";
//     error.textContent = "Registro exitoso. Ahora puedes iniciar sesión.";
//     setTimeout(() => showForm("loginForm"), 1500);
//   });

// // Simulación de recuperación de contraseña
// document.getElementById("forgotForm").addEventListener("submit", function (e) {
//   e.preventDefault();

//   const email = document.getElementById("forgotEmail").value.trim();
//   const error = document.getElementById("forgotError");

//   if (!email.includes("@")) {
//     error.textContent = "Ingresa un correo válido.";
//     return;
//   }

//   error.style.color = "green";
//   error.textContent = "Se ha enviado un enlace de recuperación.";
// });

// Cambia la URL según tu backend
const API_URL = "https://energy-app-j0vu.onrender.com/api/energy/users";

// Mostrar y ocultar formularios
function showForm(formId) {
  document
    .querySelectorAll(".form")
    .forEach((f) => f.classList.remove("active"));
  document.getElementById(formId).classList.add("active");
}

// REGISTRO
document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("registerUsername").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        document.getElementById("registerError").textContent =
          "Error: " + errorText;
        return;
      }

      const data = await response.json();
      alert("Usuario creado: " + data.username);
      showForm("loginForm");
    } catch (err) {
      document.getElementById("registerError").textContent =
        "Error de conexión: " + err.message;
    }
  });

// LOGIN (ejemplo simple: busca el usuario)
// document.getElementById("loginForm").addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const username = document.getElementById("loginUsername").value;
//   const password = document.getElementById("loginPassword").value;

//   try {
//     const response = await fetch(API_URL);
//     const users = await response.json();

//     const user = users.find(u => u.username === username && u.password === password);

//     if (user) {
//       alert("Bienvenido, " + user.username);
//     } else {
//       document.getElementById("loginError").textContent = "Usuario o contraseña incorrectos";
//     }
//   } catch (err) {
//     document.getElementById("loginError").textContent = "Error de conexión: " + err.message;
//   }
// });

// LOGIN
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const user = await response.json();
      setTimeout(() => {
        window.location.href = "/pages/home/home.html";
      }, 1000);
      //alert("Bienvenido, " + user.username);

      // Ejemplo: guardar en localStorage para mantener sesión
      localStorage.setItem("loggedUser", JSON.stringify(user));
    } else if (response.status === 401) {
      document.getElementById("loginError").textContent =
        "Contraseña incorrecta";
    } else if (response.status === 404) {
      document.getElementById("loginError").textContent =
        "Usuario no encontrado";
    } else {
      document.getElementById("loginError").textContent = "Error inesperado";
    }
  } catch (err) {
    document.getElementById("loginError").textContent =
      "Error de conexión: " + err.message;
  }
});
