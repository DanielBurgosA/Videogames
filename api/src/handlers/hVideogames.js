const {
    getGames,
    getByID,
    postGame,
} = require ("../controllers/cVideogames")

const getHandler = async (req,res) => {
    const {name} = req.query;
    try {
        const result = await getGames(name);
        if(result.lengh) throw Error ("No se encontró el juego")
        return res.status(200).json(result);
    } catch (error) {
        return res.status(404).json({ error: error.message});
    }
}

const getByIdHandler = async (req,res) => {
    const {id} = req.params;
    try {
        const result = await getByID (id);
        if(result.lengh) throw Error ("No se encontró el juego");
        return res.status(200).json(result);
    } catch (error) {
        return res.status(404).json({ error: error.message});
    }
}

const postHandler = async (req,res) =>{
    const { name, description, platform, background_image, released, rating, genres } = req.body;
    try {
        const result = await postGame(name, description, platform, background_image, released, rating, genres)
        return res.status(201).json(result);
    }
    catch (error) {
        return res.status(404).json({ error: error.message});
    }
}


module.exports = {
    getHandler,
    getByIdHandler,
    postHandler,
}