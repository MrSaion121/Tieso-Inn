setTimeout(() => {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('No se encontró el token en localStorage');
        window.location.href='/login';
        return;
    }

    // Hacer la solicitud con el token
    fetch('/home', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
}, 1000);
