setTimeout(() => {
    const token = localStorage.getItem('token');
    //Debugg
    console.log('Token desde el LocalStorage:', token);
    if (!token) {
        console.error('No se encontró el token en localStorage');
        return;
    }

    // Hacer la solicitud con el token
    fetch('/home', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}, 1000);
