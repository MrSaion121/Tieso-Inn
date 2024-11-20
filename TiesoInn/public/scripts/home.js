document.addEventListener("DOMContentLoaded", function () {
  const supportChatLink = document.getElementById("supportChatLink");
  const userId = localStorage.getItem("user_id");

  if (userId) {
    supportChatLink.href = `/support/${userId}`;
    supportChatLink.hidden = false;
  }
});

const tokenStorage = localStorage.getItem("token");
// Realiza una solicitud al servidor con el token en el encabezado
fetch(window.location.href, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${tokenStorage}`,
  },
})
  .then((response) => {
    if (response.ok) {
      return response.text(); // Si es válido, obtiene el contenido HTML
    } else if (response.status === 401) {
      // Si no es válido, redirige al login
      localStorage.removeItem("user_id");
      localStorage.removeItem("token");
      localStorage.removeItem("name");
    } else {
      throw new Error("Ocurrió un error inesperado");
    }
  })
  .catch((error) => {
    console.error("Error:", error);
    alert("Hubo un problema al cargar la página.");
  });

const params = new URLSearchParams(window.location.search);
const token = params.get("token");
const username = params.get("name");
const userId = params.get("user_id");

if (token) {
  // Almacenar los valores en localStorage
  localStorage.setItem("token", token);
  if (username) localStorage.setItem("name", username);
  if (userId) localStorage.setItem("user_id", userId);

  // Limpiar la URL para mayor seguridad
  params.delete("token");
  params.delete("name");
  params.delete("user_id");
  const newUrl = `${window.location.origin}${window.location.pathname}`;
  history.replaceState(null, "", newUrl);
}
