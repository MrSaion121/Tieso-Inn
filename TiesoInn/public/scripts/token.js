const token = localStorage.getItem('token');

if (!token) {
  // Si no hay token, redirige al login
  window.location.href = '/login';
} else {
  // Realiza una solicitud al servidor con el token en el encabezado
  fetch(window.location.href, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(response => {
      if (response.ok) {
        console.log("Prueba exitosa")
        return response.text(); // Si es válido, obtiene el contenido HTML
      } else if (response.status === 401) {
        // Si no es válido, redirige al login
        localStorage.removeItem("user_id")
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        window.location.href = '/login';
      } else {
        throw new Error('Ocurrió un error inesperado');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Hubo un problema al cargar la página.');
    });
}