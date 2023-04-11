const axios = require ("axios");
const { Genre } = require("../db");
const { API_KEY } = process.env;

/////////////////////////////////////////////////////////////////// FUNCIONES ///////////////////////////////////////////////////////////////////
let first = true;

const getGenresAPI = async () => {
    const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    const result = genresApi.data.results
    result.forEach(genre=> {
        Genre.create({id: genre.id , name: genre.name})
    });
    first = false;
}

const sendGenres = async () => {
    const results = await Genre.findAll()
    return results;  
}


/////////////////////////////////////////////////////////////////// CONTROLLERS ///////////////////////////////////////////////////////////////////

const getGenres = async () => {
    let result = [];
    if(first) await getGenresAPI();
;
    while (!result.length) result =  await sendGenres();
    
    return result;
}

module.exports = {getGenres,getGenresAPI}