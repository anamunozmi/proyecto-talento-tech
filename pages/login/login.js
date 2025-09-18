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
