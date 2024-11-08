document.getElementById("contacto-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita el envío del formulario si hay errores

    // Obtener los valores de los campos
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();
    const mensajeError = document.getElementById("form-mensaje");

    // Expresiones regulares para validar
    const nombreRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const telefonoRegex = /^[0-9]{10}$/;

    // Validar nombre
    if (!nombreRegex.test(nombre)) {
        mensajeError.textContent = "Por favor, ingresa un nombre válido (solo letras y espacios).";
        return;
    }

    // Validar correo electrónico
    if (!emailRegex.test(email)) {
        mensajeError.textContent = "Por favor, ingresa un correo electrónico válido.";
        return;
    }

    // Validar teléfono
    if (!telefonoRegex.test(telefono)) {
        mensajeError.textContent = "Por favor, ingresa un número de teléfono válido (10 dígitos).";
        return;
    }

    // Validar mensaje
    if (mensaje.length < 10) {
        mensajeError.textContent = "El mensaje debe tener al menos 10 caracteres.";
        return;
    }

    // Si todo es válido, mostrar mensaje de éxito y limpiar el formulario
    mensajeError.textContent = "¡Formulario enviado con éxito!";
    mensajeError.style.color = "#2042EA";
    document.getElementById("contacto-form").reset();
});
