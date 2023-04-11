const { default: axios } = require("axios")
const{
    getPlatafroms,
} = require ("../controllers/cPlataform")

const getHandler = async (req,res) =>{
    try {
        const result = await getPlatafroms();
        return res.status(200).json(result)
    } catch (error) {
        return res.status(404).json({ error: error.message});
    }
}

module.exports = {
    getHandler,
}