document.addEventListener("DOMContentLoaded", () => {
  //Reservaciones Propias
  const bookingTab = document.getElementById("tab-bookings")
  const bookingContent = document.getElementById("bookings")
  
  //Todas las reservaciones
  const managementTab = document.getElementById("tab-management")
  const managementContent = document.getElementById("management")
  
  //Admin
  const settingsTab = document.getElementById("tab-settings")
  const settingsContent = document.getElementById("settings")
  
  //Chat
  const chatTab = document.getElementById("tab-chats");
  const chatContent = document.getElementById("chats");
  
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem('user_id');

  if(managementTab) {
    managementTab.addEventListener("click", async () => {
      if (managementContent.dataset.loaded) return;
      try {
        const response = await fetch(`/reservations?userId=${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        if (!response.ok) {
          throw new Error("Error al cargar los chats")
        }

        const data = await response.json()
        console.log(data)
        managementContent.dataset.loaded = true;
        const reservations = data.map(
          (reservation) => `
            <li>
              ${reservation.user_id.name} reservó la habitación ${reservation.room_id.name}
              <select
                onchange="cambiarEstado(this.value, '${reservation.reservation_num}')"
                class="form-select"
              >
                <option value="Pagado" ${reservation.status === 'Pagado' ? 'selected' : ''}>Pagado</option>
                <option value="Pendiente" ${reservation.status === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
                <option value="Cancelado" ${reservation.status === 'Cancelado' ? 'selected' : ''}>Cancelado</option>
                <option value="Confirmado" ${reservation.status === 'Confirmado' ? 'selected' : ''}>Confirmado</option>
              </select>
            </li>
          `
        );
        
        managementContent.innerHTML = `<ul>${reservations}</ul>`;
      } catch (error) {
        
      }
    })
  }

  if (chatTab) {
    chatTab.addEventListener("click", async () => {
      if (chatContent.dataset.loaded) return;
      try {
        const response = await fetch("/support", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Error al cargar los chats");
        }

        const data = await response.json();
        chatContent.dataset.loaded = true;
        const chatList = data
          .map((chat, index) => `<li><a
              href="/support/${chat.customer_id}"
              class="btn btn-success"
            >Chat ${index + 1}</a></li>`)
          .join("");
        chatContent.innerHTML = `<ul>${chatList}</ul>`;
      } catch (error) {
        console.error("Error al cargar los chats:", error);
        chatContent.innerHTML = `<p>Error al cargar los chats.</p>`;
      }
    });
  }
});
