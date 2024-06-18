const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

const filePath = path.join(__dirname, 'data.json');

// Ruta para obtener el contenido del archivo
app.get('/data', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al leer el archivo' });
        }
        res.json(JSON.parse(data));
    });
});

// Ruta para guardar el contenido en el archivo
app.post('/data', (req, res) => {
    const arrayDeObjetos = req.body;

    fs.writeFile(filePath, JSON.stringify(arrayDeObjetos, null, 2), 'utf8', (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error al guardar el archivo' });
        }
        res.json({ message: 'Archivo guardado correctamente' });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});