const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(
    "mongodb+srv://franpaiss:<Fran0725>@wdcapstone.hjneb.mongodb.net/?retryWrites=true&w=majority&appName=Wdcapstone"
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

// Ruta para probar la API
app.get("/", (req, res) => {
    res.send("¡Bienvenido a mi API real!");
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
