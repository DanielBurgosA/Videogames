const {Router} = require ("express");
const rPlataform = Router();

//importar handlers
const {
    getHandler
} = require("../handlers/hPlataforms")

//rutas
rPlataform.get("/", getHandler);

module.exports = rPlataform;
