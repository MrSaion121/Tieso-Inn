function logout() {
  localStorage.removeItem("user_id");
  localStorage.removeItem("token");
  localStorage.removeItem("name");
  window.location.href = "/login";
}

document.addEventListener("DOMContentLoaded", async function () {
  const userId = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");
  if (!token) {
    logout()
  } else { 
    try {
      const response = await fetch(`/users/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        //Menu dropdown
        const dropdown = document.getElementById("dropdownId");
        dropdown.innerHTML = "Cuenta";

        const option1 = document.getElementById("option-1");
        option1.href = `/users/profile/${userId}`
        option1.innerHTML = "Mi perfil";

        document.getElementById("option-2").outerHTML = '';

        const logoutBtn = document.createElement("a");
        logoutBtn.className = "dropdown-item";
        logoutBtn.onclick = logout;
        logoutBtn.innerHTML = "Cerrar sesion";

        const menu = document.getElementById("dropdownMenu");
        menu.appendChild(logoutBtn);

        //Enlace a chat
        const supportChatLink = document.getElementById("supportChatLink");
        supportChatLink.href = `/support/${userId}`;
        supportChatLink.hidden = false;
      } else if (response.status == 401) {
        logout();
      }
    } catch (error) {
      console.error("Error de red: ", error);
    }
  }
});
