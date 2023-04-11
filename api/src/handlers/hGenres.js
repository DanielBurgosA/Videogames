const { default: axios } = require("axios")
const{
    getGenres,
} = require ("../controllers/cGenres")

const getHandler = async (req,res) =>{
    try {
        const result = await getGenres();
        return res.status(200).json(result)
    } catch (error) {
        return res.status(404).json({ error: error.message});
    }
}

module.exports = {
    getHandler,
}