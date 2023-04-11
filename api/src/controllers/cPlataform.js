const axios = require ("axios");
const { Plataform } = require("../db");
const { API_KEY } = process.env;

/////////////////////////////////////////////////////////////////// FUNCIONES ///////////////////////////////////////////////////////////////////
let first = true;

const getPlataformAPI = async () => {
    const url = `https://api.rawg.io/api/platforms?key=${API_KEY}&page=`

    for (let i = 1; i<3; i++){
        const page = await axios.get(url+i);

        page.data.results.forEach((p)=>{
            Plataform.create({ id:p.id, name:p.name });
        })
    }
    first = false;
}

const sendPlataform = async () => {
    const results = await Plataform.findAll()
    return results;  
}


/////////////////////////////////////////////////////////////////// CONTROLLERS ///////////////////////////////////////////////////////////////////

const getPlatafroms = async () => {
    let result = [];
    if(first) await getPlataformAPI();
;
    while (!result.length) result =  await sendPlataform();
    
    return result;
}

module.exports = {getPlatafroms,getPlataformAPI}