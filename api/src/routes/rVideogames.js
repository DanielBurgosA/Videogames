const {Router} = require("express");
const rVideogames = Router();

//importación de handlers
const{
    getHandler,
    getByIdHandler,
    postHandler,
} = require("../handlers/hVideogames")


//Rutas de los videosjuegos
rVideogames.get("/", getHandler );
rVideogames.get("/:id", getByIdHandler);
rVideogames.post("/", postHandler);

module.exports = rVideogames;