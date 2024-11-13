//Escucha el evento DOMContentLoaded que indica que el documento HTML ha sido completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const togglePassword = document.getElementById('togglePassword');
    const registerForm = document.getElementById('register-form');

    //elementos de los requisitos de la contraseña para mostrar su estado
    const passwordRequirements = {
        length: document.getElementById('length-requirement'),
        uppercase: document.getElementById('uppercase-requirement'),
        special: document.getElementById('special-requirement')
    };
    //Spinner de carga
    const loadingSpinner = document.getElementById('loading-spinner');

    // Expresión regular para validar la contraseña
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!.@#$%^&*])(?=.{8,})/;

    // Mostrar/ocultar contraseña (Ojo)
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        confirmPasswordInput.setAttribute('type', type);

        // Cambiar el icono
        togglePassword.innerHTML = type === 'password' ? '<i class="fa-solid fa-eye-slash"></i>' : '<i class="fa-solid fa-eye"></i>';

    });

    // Validación de requisitos de contraseña en tiempo real
    passwordInput.addEventListener('input', () => {
        const value = passwordInput.value;
        passwordRequirements.length.style.color = value.length >= 8 ? 'green' : 'red';
        passwordRequirements.uppercase.style.color = /[A-Z]/.test(value) ? 'green' : 'red';
        passwordRequirements.special.style.color = /[!.@#$%^&*]/.test(value) ? 'green' : 'red';
    });

    // Validar coincidencia de contraseña
    confirmPasswordInput.addEventListener('input', () => {
        if (confirmPasswordInput.value !== passwordInput.value) {
            confirmPasswordInput.setCustomValidity("Las contraseñas no coinciden.");
        } else {
            confirmPasswordInput.setCustomValidity("");
        }
    });

    // Mostrar el spinner y procesar el envío del formulario
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        //Alert | no coinciden las contraseñas
        if (passwordInput.value !== confirmPasswordInput.value) {
            alert("Las contraseñas no coinciden");
            return;
        }

        //Aler | Password requerimientos minimos
        if (!passwordRegex.test(passwordInput.value)) {
            alert("La contraseña no cumple con los requisitos mínimos.");
            return;
        }

        //Mostrar spinner de carga
        loadingSpinner.classList.remove('hidden');

        //Crear objeto formData con el dato
        const formData = new FormData(registerForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            cellphone: formData.get('cellphone')
        };

        try {
            //Realiza la peticion POST para registrar el usuario
            const response = await fetch('/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            //Respuesta exitosa
            if (response.ok) {
                alert('Usuario registrado exitosamente.');
                window.location.href = '/login';

            //Error
            } else {
                const errorMessage = await response.text();
                alert(`Error al registrar: ${errorMessage}`);
            }

        //atrapa el error
        } catch (error) {
            console.error("Error en el registro:", error);
            alert('Ocurrió un error. Inténtelo nuevamente.');
        } finally {
            loadingSpinner.classList.add('hidden');
        }
    });
});
