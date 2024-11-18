document.addEventListener("DOMContentLoaded", function () {
  const supportChatLink = document.getElementById("supportChatLink");
  const userId = localStorage.getItem("user_id");

  if (userId) {
    supportChatLink.href = `/support/${userId}`; 
    supportChatLink.hidden = false;
  }
});
