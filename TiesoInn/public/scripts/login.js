document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('login-form').addEventListener('submit', async function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const loginData = { email, password };

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            //const data = await response.json();


            if (response.ok) {
                const data = await response.json();
                const token = data.token;
                // Si la respuesta es exitosa, redirigir al home
                localStorage.setItem('token', data.token); //almacena token

                setTimeout(() => {
                    window.location.href = '/home';     // Redirige a la página home
                }, 500);

            } else {
                const data = await response.json();
                //si el login falla = Error
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error('Error de red:', error);
            alert('Error al iniciar sesión, por favor intente nuevamente.');
        };
    });
});
