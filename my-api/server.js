// Importar Express
const express = require("express");
const cors = require("cors");

// Crear una instancia de Express
const app = express();

// Configurar el puerto
const PORT = 5001;

// Middleware para analizar JSON y habilitar CORS
app.use(express.json());
app.use(cors());

// Ruta principal (GET)
app.get("/", (req, res) => {
    res.send("¡Bienvenido a mi API real!");
});

// Ruta para recibir datos del formulario (POST)
app.post("/contactos", (req, res) => {
    const { nombre, email, telefono, mensaje } = req.body;

    // Validar que todos los campos estén presentes
    if (!nombre || !email || !telefono || !mensaje) {
        return res.status(400).json({ error: "Todos los campos son obligatorios." });
    }

    // Responder con los datos recibidos
    res.status(201).json({
        message: "¡Contacto guardado exitosamente!",
        data: { nombre, email, telefono, mensaje },
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
