const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


mongoose
    .connect('mongodb+srv://manuelhbti21:jose123123@cluster0.qbkvfgm.mongodb.net/empleados_jose2?retryWrites=true&w=majority&appName=Cluster0')
    .then((x) => {
        console.log(`Conectado exitosamente a la base ${x.connections[0].name}`);
    })
    .catch((error) => {
        console.log('Error de conexión:', error.message);
    });
// Crear una instancia de la aplicación Express
const app = express();

// Middleware para analizar el cuerpo de las solicitudes JSON
app.use(bodyParser.json());

// Middleware para analizar los cuerpos de las solicitudes codificadas en URL
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware para permitir solicitudes desde todos los orígenes (CORS)
app.use(cors());

// Rutas de la API
const equipoRouter = require('./routes/equipo.routes');
app.use('/api', equipoRouter);

// Configuración del puerto del servidor
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('Escuchando en el puerto1 ' + port);
});

// Manejo de errores 404 - debe estar después de las rutas de la API
app.use((req, res, next) => {
    const error = new Error('Recurso no encontrado');
    error.status = 404;
    next(error);
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).send({ message: err.message });
});