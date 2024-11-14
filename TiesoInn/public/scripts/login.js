document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('login-form').addEventListener('submit', async function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const loginData = { email, password };

        try {

            //Debugg
            console.log('Enviando solicitud de login a /login');

            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            //Debugg: Verificar el estado de la respuesta
            console.log('Estado de la respuesta:', response.status);

            const data = await response.json();

            //Debugg
            console.log('Respuesta del servidor:', data);

            if (response.ok) {

                //Debugg
                console.log('Login exitoso, token recibido:', data.token);

                // Si la respuesta es exitosa, redirigir al home
                localStorage.setItem('token', data.token); //almacena token

                //Debugg
                console.log('Token almacenado en localStorage:', localStorage.getItem('token'));

                setTimeout(() => {
                    window.location.href = '/home';// Redirige a la página home
                }, 500);

            } else {
                //si el login falla = Error
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error('Error de red:', error);
            alert('Error al iniciar sesión, por favor intente nuevamente.');
        }
    });

})
