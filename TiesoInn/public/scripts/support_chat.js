function logout() {
    alert('Se ha cerrado su sesion')
    localStorage.removeItem("user_id")
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    window.location.href = '/login';
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

document.addEventListener("DOMContentLoaded", async () => {
    const socket = io("/");
    const messageBox = document.getElementById("messages");
    const messageInput = document.getElementById("message");
    const roomID = window.location.href.split("/").pop();
    const username = localStorage.getItem("name");
    const user_id = localStorage.getItem("user_id");
    
    if (!username || !user_id) {
        alert("Por favor inicia sesión antes de usar el chat.");
        window.location.href = "/login";
        return;
    }
    
    try {
        const response = await fetch(`/support/chat/${roomID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });

        if (response.ok) {
            const chat = await response.json();
            displayMessages(chat.chatlog);
        } else if (response.status === 404) {
            const createResponse = await fetch(`/support/${roomID}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (createResponse.ok) {
                console.log("Chat creado con éxito");
            } else {
                console.error("Error al crear el chat");
            }
        } else if (response.status === 401) {
            logout()
        } else {
            console.error("Error al verificar el chat");
        }
    } catch (error) {
        console.error("Error de red:", error);
    }

    socket.emit("joinRoom", { room: roomID, user: user_id === roomID ? "Cliente" : "Soporte" });

    socket.on("joinRoom", (user) => {
        const eventMessage = createMessageElement({
            className: "event-message",
            message: `${user} ha entrado al chat`,
            isEvent: true,
        });
        messageBox.appendChild(eventMessage);
        messageBox.scrollTop = messageBox.scrollHeight;
    });

    socket.on("messageReceived", (data) => {
        const className = data.sender === user_id ? "own-message" : "received-message";
        const user = sender === user_id ? username : sender === roomID ? "Cliente" : "Soporte";
        const newMessage = createMessageElement({
            className,
            user,
            message: data.message,
        });
        messageBox.appendChild(newMessage);
        messageBox.scrollTop = messageBox.scrollHeight;
    });

    socket.on("leftRoom", (user) => {
        const eventMessage = createMessageElement({
            className: "event-message",
            message: `${user} ha salido del chat`,
            isEvent: true,
        });
        messageBox.appendChild(eventMessage);
        messageBox.scrollTop = messageBox.scrollHeight;
    });

    document.getElementById("trigger").addEventListener("click", async () => {
        const msg = messageInput.value.trim();

        if (!msg) return;

        messageInput.value = "";

        try {
            console.log(`PUT URL: /support/${roomID}`)
            const response = await fetch(`/support/${roomID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    sender: user_id,
                    text: msg
                })
            });

            if (response.ok) {
                socket.emit("sendNewMessage", { user: username, message: msg, room: roomID });
            } else if (response.status === 401) {
                logout()
            } else {
                console.error("Error al enviar el mensaje");
            }
        } catch (error) {
            console.error("Error de red:", error);
        }

        const newMessage = createMessageElement({
            className: "own-message",
            user: username,
            message: msg,
        });
        messageBox.appendChild(newMessage);
        messageBox.scrollTop = messageBox.scrollHeight;
    });

    window.addEventListener("pagehide", () => {
        socket.emit("leftRoom", { room: roomID, user: user_id === roomID ? "Cliente" : "Soporte" });
    });

    function displayMessages(messages) {
        messages.forEach(({ sender, text }) => {
            const className = sender === user_id ? "own-message" : "received-message";
            const user = sender === user_id ? username : sender === roomID ? "Cliente" : "Soporte";
            const newMessage = createMessageElement({
                className,
                user,
                message: text,
            });
            messageBox.appendChild(newMessage);
        });
        messageBox.scrollTop = messageBox.scrollHeight;
    }
});


