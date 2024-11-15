setTimeout(() => {
    const token = localStorage.getItem('token');
    const urlParams = new URLSearchParams(window.location.search);
    const tokenUrl = urlParams.get('token');

    if (tokenUrl) {
        // Guardar el token en localStorage
        localStorage.setItem('token', tokenUrl);

        // Redirigir a la página de inicio
        window.location.href = '/home';
    } else {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('No se encontró el token en la URL');
            window.location.href = '/login';
        }
    }


    // Hacer la solicitud con el token
    fetch('/home', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then(response => {
        if (response.ok) {
            // Redirigir a /home si todo sale bien
            //window.location.href = '/home';
        } else {
            // Si la respuesta no es exitosa, redirigir a login
            window.location.href = '/login';
        }
    }).catch(err => {
        console.error('Error de autenticación:', err);
        window.location.href = '/login';
    });
}, 1000);
