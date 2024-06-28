const express = require('express');
const equipoRouter = express.Router();
const equipo = require('../models/equipo'); // Asegúrate de importar el modelo correcto

// Agregar equipo nuevo
equipoRouter.route('/agregar').post((req, res) => {
    console.log('Datos recibidos en agregar equipo:', req.body); // Verifica qué datos se están recibiendo
    equipo.create(req.body)
        .then((data) => {
            console.log('Se insertó un equipo:', data); // Verifica qué datos se insertaron
            res.send(data); // Devuelve el dato creado si es necesario
        })
        .catch((error) => {
            console.error('Error al insertar equipo:', error);
            res.status(500).send('Error al insertar equipo');
        });
});

// Obtener todos los equipos de la base de datos
equipoRouter.route('/equipos').get((req, res) => {
    equipo.find()
        .then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.error('Error al obtener equipos:', error);
            res.status(500).send('Error al obtener equipos');
        });
});

// Obtener un sólo equipo por su ID
equipoRouter.route('/equipo/:id').get((req, res) => {
    equipo.findById(req.params.id)
        .then((data) => {
            if (!data) {
                res.status(404).send('Equipo no encontrado');
            } else {
                res.send(data);
            }
        })
        .catch((error) => {
            console.error('Error al obtener equipo por ID:', error);
            res.status(500).send('Error al obtener equipo');
        });
});

// Actualizar un equipo
equipoRouter.route('/actualizar/:id').put((req, res) => {
    equipo.findByIdAndUpdate(req.params.id, {
            $set: req.body
        })
        .then((data) => {
            if (!data) {
                res.status(404).send('Equipo no encontrado para actualizar');
            } else {
                console.log('Se actualizó el equipo:', data); // Verifica qué datos se actualizaron
                res.send(data);
            }
        })
        .catch((error) => {
            console.error('Error al actualizar equipo:', error);
            res.status(500).send('Error al actualizar equipo');
        });
});

// Eliminar un equipo
equipoRouter.route('/delete/:id').delete((req, res) => {
    equipo.findByIdAndDelete(req.params.id)
        .then((data) => {
            if (!data) {
                res.status(404).send('Equipo no encontrado para eliminar');
            } else {
                console.log('Se eliminó el equipo:', data); // Verifica qué datos se eliminaron
                res.send(data);
            }
        })
        .catch((error) => {
            console.error('Error al eliminar equipo:', error);
            res.status(500).send('Error al eliminar equipo');
        });
});

module.exports = equipoRouter;
