const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(
    "mongodb+srv://<franpaiss@gmail.com>:<Fran0725>@cluster0.mongodb.net/contactosDB?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log("Conectado a MongoDB Atlas"))
.catch((error) => console.error("Error al conectar a MongoDB:", error));

// Modelo de datos
const Contacto = mongoose.model("Contacto", {
    nombre: String,
    email: String,
    telefono: String,
    mensaje: String,
});

// Ruta para guardar contactos
app.post("/contactos", async (req, res) => {
    const { nombre, email, telefono, mensaje } = req.body;

    if (!nombre || !email || !telefono || !mensaje) {
        return res.status(400).json({ error: "Todos los campos son obligatorios." });
    }

    try {
        const nuevoContacto = new Contacto({ nombre, email, telefono, mensaje });
        await nuevoContacto.save();
        res.status(201).json({ message: "¡Contacto guardado exitosamente!" });
    } catch (error) {
        res.status(500).json({ error: "Error al guardar el contacto." });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
