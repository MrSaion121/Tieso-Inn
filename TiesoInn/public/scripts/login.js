document.addEventListener('DOMContentLoaded', function () {
    // Elementos del formulario y contraseña
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const googleLoginButton = document.getElementById('googleLoginButton');

    //Modal Carga
    const loadingModal = document.getElementById('loadingModal');

    // Mostrar/ocultar contraseña
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        // Cambiar el icono del toggle
        togglePassword.innerHTML = type === 'password'
            ? '<i class="fa-solid fa-eye-slash"></i>'
            : '<i class="fa-solid fa-eye"></i>';
    });

    // Función para manejar el submit del formulario de login
    const handleLogin = async (event) => {
        event.preventDefault();

        // Mostrar el modal de carga
        loadingModal.style.display = 'flex';

        const email = emailInput.value;
        const password = passwordInput.value;
        const loginData = { email, password };

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            // Ocultar el modal de carga
            loadingModal.style.display = 'none';

            // Si la respuesta es exitosa, redirigir al home
            if (response.ok) {
                const data = await response.json();
                const token = data.token;

                localStorage.setItem('token', token); // Almacena el token

                setTimeout(() => {
                    window.location.href = '/home';  // Redirige a la página home
                }, 500);
            } else {
                const data = await response.json();
                alert(`Error: ${data.error}`);  // Muestra el error de login
            }
        } catch (error) {
            console.error('Error de red:', error);
            alert('Error al iniciar sesión, por favor intente nuevamente.');
        }
    };

    // Funcionalidad para manejar el inicio de sesión con Google
    const handleGoogleLogin = async () => {
        try {
            const googleUser = await google.accounts.id.prompt();
            const idToken = googleUser.credential;

            // Enviar el token al backend
            const response = await fetch('/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: idToken }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token); // guardar el token en localStorage

                // Redirigir al home
                window.location.href = '/home';
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error en el inicio de sesión con Google:', error);
            alert('No se pudo completar el inicio de sesión con Google.');
        }
    };

    // Agregar evento al botón de Google
    googleLoginButton.addEventListener('click', handleGoogleLogin);

    // Agregar el listener de submit al formulario
    loginForm.addEventListener('submit', handleLogin);
});
