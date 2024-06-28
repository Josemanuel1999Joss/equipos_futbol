const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Equipo= new Schema({
    nombre: {
        type: String
    },
    pais: {
        type: String
    },
    miembros: {
        type: [String]  // Arreglo de cadenas
    },
    categoria: {
        type: String
    }
}, {
    collection: 'equipos'
});

module.exports = mongoose.model('Equipo', Equipo);
