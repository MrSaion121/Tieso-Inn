document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const togglePassword = document.getElementById('togglePassword');
    const registerForm = document.getElementById('register-form');

    const passwordRequirements = {
        length: document.getElementById('length-requirement'),
        uppercase: document.getElementById('uppercase-requirement'),
        special: document.getElementById('special-requirement')
    };
    const loadingSpinner = document.getElementById('loading-spinner');

    // Expresión regular para validar la contraseña
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!.@#$%^&*])(?=.{8,})/;

    // Mostrar/ocultar contraseña
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        confirmPasswordInput.setAttribute('type', type);
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
        if (passwordInput.value !== confirmPasswordInput.value){
            alert("Las contraseñas no coinciden");
            return;
        }

        //Aler | Password requerimientos minimos
        if (!passwordRegex.test(passwordInput.value)) {
            alert("La contraseña no cumple con los requisitos mínimos.");
            return;
        }

        loadingSpinner.classList.remove('hidden');

        const formData = new FormData(registerForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            cellphone: formData.get('cellphone')
        };

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert('Usuario registrado exitosamente.');
                window.location.href = '/login';
            } else {
                const errorMessage = await response.text();
                alert(`Error al registrar: ${errorMessage}`);
            }
        } catch (error) {
            console.error("Error en el registro:", error);
            alert('Ocurrió un error. Inténtelo nuevamente.');
        } finally {
            loadingSpinner.classList.add('hidden');
        }
    });
});
