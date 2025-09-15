function showForm(formId) {
  const forms = document.querySelectorAll(".form");
  forms.forEach((form) => form.classList.remove("active"));
  document.getElementById(formId).classList.add("active");

  // Limpiar mensajes de error al cambiar
  document
    .querySelectorAll(".error-message")
    .forEach((e) => (e.textContent = ""));
}

// Simulación de login
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const error = document.getElementById("loginError");

  if (username === "admin" && password === "1234") {
    error.style.color = "green";
    error.textContent = "Login exitoso. Redirigiendo...";
    setTimeout(() => {
      window.location.href = "/pages/home/home.html";
    }, 1500);
  } else {
    error.textContent = "Usuario o contraseña incorrectos.";
  }
});

// Simulación de registro
document
  .getElementById("registerForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("registerUsername").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value.trim();
    const error = document.getElementById("registerError");

    if (!username || !email || !password) {
      error.textContent = "Todos los campos son obligatorios.";
      return;
    }

    error.style.color = "green";
    error.textContent = "Registro exitoso. Ahora puedes iniciar sesión.";
    setTimeout(() => showForm("loginForm"), 1500);
  });

// Simulación de recuperación de contraseña
document.getElementById("forgotForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("forgotEmail").value.trim();
  const error = document.getElementById("forgotError");

  if (!email.includes("@")) {
    error.textContent = "Ingresa un correo válido.";
    return;
  }

  error.style.color = "green";
  error.textContent = "Se ha enviado un enlace de recuperación.";
});
