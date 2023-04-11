const { Router } = require('express');
// Importar todos los routers;
const rVideogames = require ("./rVideogames");
const rGenres = require ("./rGenres")
const rPlataform = require ("./rPlataform")


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/videogames", rVideogames)
router.use("/genres", rGenres)
router.use("/platforms", rPlataform)


module.exports = router;
