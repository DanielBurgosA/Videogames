const {Router} = require ("express");
const rGenres = Router();

//importar handlers
const {
    getHandler
} = require("../handlers/hGenres")

//rutas
rGenres.get("/", getHandler);

module.exports = rGenres;
