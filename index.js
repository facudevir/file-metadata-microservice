// index.js
// Microservicio de metadatos de archivos (File Metadata)
// Rutas:
//  - GET  /          -> formulario para subir archivo
//  - POST /api/fileanalyse  -> devuelve name, type, size del archivo subido

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.static('public'));

// Configuración de multer (almacenamiento en memoria)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

// Ruta que exige FreeCodeCamp: /api/fileanalyse
// Campo del formulario: "upfile"
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  // Si no viene archivo, devolvemos error simple
  if (!req.file) {
    return res.json({ error: 'No file uploaded' });
  }

  const file = req.file;

  // Respuesta con metadatos que espera FreeCodeCamp:
  // name: nombre original
  // type: mimetype
  // size: tamaño en bytes
  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  });
});

// Puerto (Render usa process.env.PORT)
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
