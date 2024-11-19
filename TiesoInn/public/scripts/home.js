document.addEventListener("DOMContentLoaded", function () {
  const supportChatLink = document.getElementById("supportChatLink");
  const userId = localStorage.getItem("user_id");

  if (userId) {
    supportChatLink.href = `/support/${userId}`; 
    supportChatLink.hidden = false;
  }
});

const params = new URLSearchParams(window.location.search);
const token = params.get('token');
const username = params.get('name');
const userId = params.get('user_id');

if (token) {
    // Almacenar los valores en localStorage
    localStorage.setItem('token', token);
    if (username) localStorage.setItem('name', username);
    if (userId) localStorage.setItem('user_id', userId);

    // Limpiar la URL para mayor seguridad
    params.delete('token');
    params.delete('name');
    params.delete('user_id');
    const newUrl = `${window.location.origin}${window.location.pathname}`;
    history.replaceState(null, '', newUrl);
}