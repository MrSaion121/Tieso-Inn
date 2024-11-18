const socket = io("/");

// Referencias a elementos del DOM
const messageBox = document.getElementById("messages");
const messageInput = document.getElementById("message");
const roomID = window.location.href.split("/").pop();
const username = localStorage.getItem("name");

// Validación inicial del usuario
if (!username) {
    alert("Por favor inicia sesión antes de usar el chat.");
    window.location.href = "/login";
}

// Función para crear elementos de mensaje
function createMessageElement({ className, user, message, isEvent = false }) {
  const newMessage = document.createElement("div");
  newMessage.className = className;

  // Nombre de usuario (si aplica)
  if (user) {
      const userElement = document.createElement("span");
      userElement.className = "user-name";
      userElement.innerText = `${user}: `;
      newMessage.appendChild(userElement);
  }

  // Contenido del mensaje
  const sanitizedMessage = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const messageContent = document.createTextNode(sanitizedMessage);
  newMessage.appendChild(messageContent);

  // Fecha y hora del mensaje (solo si no es un evento)
  if (!isEvent) {
      const messageDate = document.createElement("span");
      messageDate.className = "message-date";
      messageDate.innerText = new Date().toLocaleString("es-MX", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
      });
      newMessage.appendChild(messageDate);
  }

  return newMessage;
}


// Conexión al socket
socket.emit("joinRoom", {
    room: roomID,
    user: username,
});

socket.on("joinRoom", (user) => {
  const eventMessage = createMessageElement({
      className: "event-message",
      message: `${user} ha entrado al chat`,
      isEvent: true, // Indica que es un mensaje de evento
  });
  messageBox.appendChild(eventMessage);
  messageBox.scrollTop = messageBox.scrollHeight;
});

socket.on("messageReceived", (data) => {
    const newMessage = createMessageElement({
        className: "received-message",
        user: data.user,
        message: data.message,
    });
    messageBox.appendChild(newMessage);
    messageBox.scrollTop = messageBox.scrollHeight;
});

socket.on("leftRoom", (user) => {
  const eventMessage = createMessageElement({
      className: "event-message",
      message: `${user} ha salido del chat`,
      isEvent: true, // Indica que es un mensaje de evento
  });
  messageBox.appendChild(eventMessage);
  messageBox.scrollTop = messageBox.scrollHeight;
});

// Envío de mensajes
document.getElementById("trigger").addEventListener("click", () => {
    const msg = messageInput.value.trim();

    if (!msg) {
        return;
    }

    // Limpiar campo de entrada y enviar mensaje
    messageInput.value = "";
    socket.emit("sendNewMessage", {
        user: username,
        message: msg,
        room: roomID,
    });

    const newMessage = createMessageElement({
        className: "own-message",
        user: username,
        message: msg,
    });
    messageBox.appendChild(newMessage);
    messageBox.scrollTop = messageBox.scrollHeight;
});

// Manejo de desconexión
const pageHideListener = () => {
    socket.emit("leftRoom", {
        room: roomID,
        user: username,
    });
};

window.addEventListener("pagehide", pageHideListener);

