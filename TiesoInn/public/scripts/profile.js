const token = localStorage.getItem("token");
const userId = localStorage.getItem("user_id");

async function cambiarEstado(state, id) {
  try {
    const response = await fetch(`/reservations/${id}?userId=${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: state }),
    });
    if (!response.ok) {
      throw new Error("Error al cambiar el estado de la reservacion");
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error de red:", error);
    alert("Error al actualizar la reservacion");
  }
}

async function eliminarUsuario(id) {
  console.log(id)
  try {
    const response = await fetch(`/users/${id}?userId=${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: 'Eliminado' }),
    });
    if (!response.ok) {
      throw new Error("Error al eliminar el usuario");
    }
  } catch (error) {
    console.error("Error de red:", error);
    alert("Error al eliminar al usuario");
  }
}

async function modificarUsuario(id) {
  const updatedUser = {
    user_id: id,
    name: document.getElementById("nameInput").value,
    role: document.getElementById("roleInput").value,
    email: document.getElementById("emailInput").value,
    status: document.getElementById("roomStatusInput").value,
  };

  try {
    const response = await fetch(`/users/${id}?userId=${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });

    if(response.ok) {
      alert('Usuario actualizado')
      location.reload()
    } else {
      throw new Error("Error al actualizar al usuario");
    }
  } catch (error) {
    console.error(error)
  }
}

async function modificarHabitacion(id) {
  const updatedRoom = {
    //name: document.getElementById("roomNameInput").value,
    //category_id: document.getElementById("categoryInput").value,
    price_per_night: document.getElementById("priceInput").value,
    description: document.getElementById("descriptionInput").value,
    status: document.getElementById("roomStatusInput").value,
  };

  try {
    const response = await fetch(`/rooms/${id}?userId=${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedRoom),
    });

    if(response.ok) {
      alert('Habitacion actualizada')
      location.reload()
    } else {
      throw new Error("Error al actualizar la habitacion");
    }
  } catch (error) {
    console.error(error)
  }
}

function showEditRoomForm(room) {
  // Renderizar los inputs y el botón de guardar
  console.log(room);
  const form = `
        <h3>Editar Habitación</h3>
        <form id="editRoomForm">
          <div class="mb-3">
            <label for="roomNameInput" class="form-label">Categoría</label>
            <input type="text" id="roomNameInput" class="form-control" value=NO-FUNCIONA-TODAVIA>
          </div>
          <div class="mb-3">
            <label for="categoryInput" class="form-label">Categoría</label>
            <input type="text" id="categoryInput" class="form-control" value="${
              room.category_id
            }">
          </div>
          <div class="mb-3">
            <label for="priceInput" class="form-label">Precio por Noche</label>
            <input type="number" id="priceInput" class="form-control" value="${
              room.price_per_night
            }">
          </div>
          <div class="mb-3">
            <label for="descriptionInput" class="form-label">Descripción</label>
            <textarea id="descriptionInput" class="form-control">${
              room.description
            }</textarea>
          </div>
          <div class="mb-3">
            <label for="imageInput" class="form-label">URL de la Imagen</label>
            <input type="text" id="imageInput" class="form-control" value="${
              room.image_url
            }">
          </div>
          <div class="mb-3">
            <label for="roomStatusInput" class="form-label">Estado</label>
            <select id="roomStatusInput" class="form-control">
              <option value="Disponible" ${
                room.status === "Disponible" ? "selected" : ""
              }>Disponible</option>
              <option value="Ocupado" ${
                room.status === "Ocupado" ? "selected" : ""
              }>Ocupado</option>
            </select>
          </div>
          <button type="button" class="btn btn-success" onclick="modificarHabitacion('${
            room.room_id
          }')">Guardar Cambios</button>
        </form>
      `;
  document.getElementById("editRoomFormContainer").innerHTML = form;
}

function showEditUserForm(user) {
  // Renderizar los inputs y el botón de guardar
  console.log(user)
  const form = `
        <h3>Editar Usuario</h3>
        <form id="editUserForm">
          <div class="mb-3">
            <label for="nameInput" class="form-label">Nombre</label>
            <input type="text" id="nameInput" class="form-control" value="${
              user.name
            }">
          </div>
          <div class="mb-3">
            <label for="roleInput" class="form-label">Rol</label>
            <select id="roleInput" class="form-control">
              <option value="Cliente" ${
                user.role === "Cliente" ? "selected" : ""
              }>Cliente</option>
              <option value="Recepcionista" ${
                user.role === "Recepcionista" ? "selected" : ""
              }>Recepcionista</option>
              <option value="Gerente" ${
                user.role === "Gerente" ? "selected" : ""
              }>Gerente</option>
              <option value="Admin" ${
                user.role === "Admin" ? "selected" : ""
              }>Admin</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="emailInput" class="form-label">Correo Electrónico</label>
            <input type="email" id="emailInput" class="form-control" value="${
              user.email
            }">
          </div>
          <div class="mb-3">
            <label for="cellphoneInput" class="form-label">Teléfono</label>
            <input type="text" id="cellphoneInput" class="form-control" value="${
              user.cellphone
            }">
          </div>
          <div class="mb-3">
            <label for="statusInput" class="form-label">Estado</label>
            <select id="statusInput" class="form-control">
              <option value="Activo" ${
                user.status === "Activo" ? "selected" : ""
              }>Activo</option>
              <option value="Bloqueado" ${
                user.status === "Bloqueado" ? "selected" : ""
              }>Bloqueado</option>
            </select>
          </div>
          <button type="button" class="btn btn-success" onclick="modificarUsuario('${
            user.user_id
          }')">Guardar Cambios</button>
        </form>
      `;
  document.getElementById("editUserFormContainer").innerHTML = form;
}

function crearUsuario() {
  const newUser = {
    name: document.getElementById("nameInput").value,
    role: document.getElementById("roleInput").value,
    email: document.getElementById("emailInput").value,
    password: document.getElementById("passwordInput").value,
    cellphone: document.getElementById("cellphoneInput").value,
    status: document.getElementById("statusInput").value,
  };

  fetch("/users", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  })
    .then((response) => {
      if (response.ok) {
        alert("Usuario creado exitosamente.");
        document.getElementById("createUserForm").reset();
      } else {
        alert("Error al crear el usuario.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Ocurrió un error al crear el usuario.");
    });
}


document.addEventListener("DOMContentLoaded", () => {
  //Reservaciones Propias
  const bookingTab = document.getElementById("tab-bookings");
  const bookingContent = document.getElementById("bookings");

  //Todas las reservaciones
  const managementTab = document.getElementById("tab-management");
  const managementContent = document.getElementById("management");

  const userManageTab = document.getElementById("sub-tab-user-management");
  const userManageContent = document.getElementById("user-management");

  const roomManageTab = document.getElementById("sub-tab-rooms");
  const roomManageContent = document.getElementById("room-management");

  //Chat
  const chatTab = document.getElementById("tab-chats");
  const chatContent = document.getElementById("chats");
  
  if (roomManageTab) {
    roomManageTab.addEventListener("click", async () => {
      if (roomManageContent.dataset.loaded) return;
      try {
        const response = await fetch(`/rooms`, {
          method: "GET",
          headers: {
            accept: "application/json"
          } 
        });
        if (!response.ok) {
          throw new Error("Error al cargar las habitaciones");
        }
        const data = await response.json();
        roomManageContent.dataset.loaded = true;
        const rooms = data
          .map(
            (room) => `
            <tr>
              <td>${room.room_id}</td>
              <td>${room.name}</td>
              <td>${room.price_per_night}</td>
              <td>${room.status}</td>
              <td>
                <button class="btn btn-warning btn-sm" onclick='showEditRoomForm(${JSON.stringify(room)})'>Editar</button>
              </td>
            </tr>
          `
          )
          .join("");

        roomManageContent.innerHTML = `<p>Administrar las habitaciones</p>
          <button class="btn btn-primary">Crear habitacion</button>
          <table class="table table-striped mt-3">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
              </thead>
              <tbody>
                ${rooms}
              </tbody>
          </table>
          <div id="editRoomFormContainer"></div>`;
      } catch (error) {
        console.error("Error al cargar las habitaciones:", error);
        roomManageContent.innerHTML = `<p>Error al cargar las habitaciones.</p>`;
      }
    });
  }

  if (userManageTab) {
    userManageTab.addEventListener("click", async () => {
      if (userManageContent.dataset.loaded) return;
      try {
        const response = await fetch(`/users?userId=${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Error al cargar los usuarios");
        }

        const data = await response.json();
        userManageContent.dataset.loaded = true;
        const users = data
          .map(
            (user) => `
            <tr>
              <td>${user.user_id}</td>
              <td>${user.name}</td>
              <td>${user.role}</td>
              <td>${user.status}</td>
              <td>
                <button class="btn btn-warning btn-sm" onclick='showEditUserForm(${JSON.stringify(user)})'>Editar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarUsuario('${user.user_id}')">Eliminar</button>
              </td>
            </tr>
          `
          )
          .join("");

        userManageContent.innerHTML = `<p>Administrar usuarios del sistema.</p>
          <table class="table table-striped mt-3">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
              </thead>
              <tbody>
                <!-- Más filas dinámicas -->
                ${users}
              </tbody>
          </table>
          <div id="editUserFormContainer"></div>`;
      } catch (error) {
        console.error("Error al cargar los usuarios:", error);
        userManageContent.innerHTML = `<p>Error al cargar los usuarios.</p>`;
      }
    });
  }

  if (bookingTab) {
    bookingContent.addEventListener("click", async () => {
      if (bookingContent.dataset.loaded) return;
      try {
        const response = await fetch(`/reservations/user/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Error al cargar las reservaciones");
        }

        const data = await response.json();
        bookingContent.dataset.loaded = true;
        const reservations = data
          .map(
            (reservation) => `
            <li>
              <div>Habitación ${reservation.room_id.name}</div>
              <div>Fecha de entrada ${reservation.arrival_date}</div>
              <div>Fecha de salida ${reservation.checkout_date}</div>
            </li>
          `
          )
          .join("");

        bookingContent.innerHTML = `<ul>${reservations}</ul>`;
      } catch (error) {
        console.error("Error al cargar las reservaciones:", error);
        bookingContent.innerHTML = `<p>Error al cargar las reservaciones.</p>`;
      }
    });
  }

  if (managementTab) {
    managementTab.addEventListener("click", async () => {
      if (managementContent.dataset.loaded) return;
      try {
        const response = await fetch(`/reservations?userId=${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Error al cargar las reservaciones");
        }

        const data = await response.json();
        console.log(data);
        managementContent.dataset.loaded = true;
        const reservations = data
          .map(
            (reservation) => `
            <li>
              ${reservation.user_id.name} reservó la habitación ${
              reservation.room_id.name
            }
              <select
                onchange="cambiarEstado(this.value, '${
                  reservation.reservation_num
                }')"
                class="form-select"
              >
                <option value="Pagado" ${
                  reservation.status === "Pagado" ? "selected" : ""
                }>Pagado</option>
                <option value="Pendiente" ${
                  reservation.status === "Pendiente" ? "selected" : ""
                }>Pendiente</option>
                <option value="Cancelado" ${
                  reservation.status === "Cancelado" ? "selected" : ""
                }>Cancelado</option>
                <option value="Confirmado" ${
                  reservation.status === "Confirmado" ? "selected" : ""
                }>Confirmado</option>
              </select>
            </li>
          `
          )
          .join("");
        managementContent.innerHTML = `<ul>${reservations}</ul>`;
      } catch (error) {
        console.error("Error al cargar las reservaciones:", error);
        managementContent.innerHTML = `<p>Error al cargar las reservaciones.</p>`;
      }
    });
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
          .map(
            (chat, index) => `<li><a
              href="/support/${chat.customer_id}"
              class="btn btn-success"
            >Chat ${index + 1}</a></li>`
          )
          .join("");
        chatContent.innerHTML = `<ul>${chatList}</ul>`;
      } catch (error) {
        console.error("Error al cargar los chats:", error);
        chatContent.innerHTML = `<p>Error al cargar los chats.</p>`;
      }
    });
  }
});
