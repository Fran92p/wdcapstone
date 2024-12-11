document.getElementById("contacto-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();
    const mensajeError = document.getElementById("form-mensaje");

    const nombreRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const telefonoRegex = /^[0-9]{10}$/;

    if (!nombreRegex.test(nombre)) {
        mensajeError.textContent = "Por favor, ingresa un nombre válido (solo letras y espacios).";
        return;
    }

    if (!emailRegex.test(email)) {
        mensajeError.textContent = "Por favor, ingresa un correo electrónico válido.";
        return;
    }

    if (!telefonoRegex.test(telefono)) {
        mensajeError.textContent = "Por favor, ingresa un número de teléfono válido (10 dígitos).";
        return;
    }

    if (mensaje.length < 10) {
        mensajeError.textContent = "El mensaje debe tener al menos 10 caracteres.";
        return;
    }

    mensajeError.textContent = "¡Formulario enviado con éxito!";
    mensajeError.style.color = "#2042EA";
    document.getElementById("contacto-form").reset();
});

// Función para cargar el clima actual
document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "a7abe1f0f157e4ebfa63700815bd47bf";
    const ciudad = "Montevideo"; // Cambia la ciudad si es necesario
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const climaDiv = document.getElementById("clima");

            if (data.cod === 200) {
                const iconoClima = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

                climaDiv.innerHTML = `
                    <p><strong>Ciudad:</strong> ${data.name}</p>
                    <p><strong>Temperatura:</strong> ${data.main.temp}°C</p>
                    <p><strong>Humedad:</strong> ${data.main.humidity}%</p>
                    <p><strong>Descripción:</strong> ${data.weather[0].description}</p>
                    <img src="${iconoClima}" alt="${data.weather[0].description}" title="${data.weather[0].description}" />
                `;
            } else {
                climaDiv.innerHTML = `<p>Error al obtener el clima: ${data.message}</p>`;
            }
        })
        .catch(error => {
            const climaDiv = document.getElementById("clima");
            climaDiv.innerHTML = `<p>Error de conexión: ${error.message}</p>`;
        });
});
