const { Op } = require ("sequelize");
const axios = require ("axios");
const { Videogame, Genre, Plataform } = require("../db");
const { API_KEY } = process.env;


/////////////////////////////////////////////////////////////////// FUNCIONES ///////////////////////////////////////////////////////////////////
const getAPI = async (name) => {
    const result = [];
    const url = name ? `https://api.rawg.io/api/games?key=${API_KEY}&search=${name}&page=` :`https://api.rawg.io/api/games?key=${API_KEY}&page=`;

    try {
      for (let i = 1; i<8; i++){
        const gamesPage = await axios.get(url+i);
        
        gamesPage.data.results.map( (game) => {
          result.push({
            id:game.id,
            name:game.name,
            platform: game.platforms?.map((num) => num.platform.name),
            background_image: game.background_image,
            rating: game.rating,
            created: false,
            genres: game.genres.map((g) => g.name),
            })
        })
      }
      return result;
    } catch (error) {
      throw Error(`Error en la API: ${error.message}`)
    }
     
}

const getDB = async (name) => {

  let games = [];
  const sql = name ? { where:{ name:{ [Op.iLike]:`%${name}%` } } , include:[{ model:Genre , attributes:["name"] , through:{attributes : []} }, { model:Plataform , attributes:["name"] , through:{attributes : []} }]} :
                    { include:[{ model:Genre , attributes:["name"] , through:{attributes : []} }, { model:Plataform , attributes:["name"] , through:{attributes : []} }]} ;

  try {
    games = await Videogame.findAll(sql);
    return games.map((game) => {
           
      return {
        id:game.id,
        name:game.name,
        platform: game.dataValues.plataforms.map((p) => p.dataValues.name),
        background_image: game.background_image,
        rating: game.rating,
        created: true,
        genres: game.dataValues.genres.map((g) => g.dataValues.name),
        }
  })
  } catch (error) {
    throw Error (`Error en la DB: ${error.message}`)
  }  

}

//--------------------------------------------------// BUSCAR POR ID //--------------------------------------------------////
const getIdAPI = async (id) =>{
    try {
        const game = (await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)).data;
        const result = {
          id: game.id,
          name: game.name,
          description: game.description,
          background_image: game.background_image,
          background_image_additional: game.background_image_additional,
          rating: game.rating,
          genres: game.genres?.map((g) => g.name),
          released: game.released,
          developers: game.developers?.map((d) => d.name),
          esrb: game.esrb_rating?.name,
          tags: game.tags?.map((t) => t.name).slice(0,9),
          platform: game.platforms?.map((p) => p.platform.name),
          comments: game.ratings?.map((r) => `${r.title} (${r.count})` ),
          created: false,
        };
        
        return result;
      } catch (error) {
        throw Error(`API no disponible: ${error.message}`);
      }
}

const getIdDB = async (id) => {
  try {
    const game = await Videogame.findByPk( id ,{
      include: [ { model:Genre , attributes:["name"] , through:{ attributes:[] }, },
      { model:Plataform , attributes:["name"] , through:{ attributes:[] }, }],
    });

    const result = {
      id:game.id,
      name:game.name,
      platform: game.plataforms.map((p) => p.name),
      background_image: game.background_image,
      rating: game.rating,
      created: false,
      genres: game.genres.map((g) => g.name),
    }
    return result;
  
  } catch (error) {
    throw Error (`Error en la DB: ${error.message}`)
  }   
      
}

//--------------------------------------------------// POST GAME //--------------------------------------------------//
const validate = async(f , array) => {
  const res = f==="g" ? await Genre.findAll({where :{name:array}}) : await Plataform.findAll({where :{name:array}})
  if (!res) throw Error("El género no existe");
  return res;
}

const setGenres = async (newGame, res) => {
  try {
    await newGame.addGenre(res)
  } catch (error) {
    throw Error(error.message)
  }
}

const setPlataforms = async (newGame, res) => {
  try {
      await newGame.addPlataform(res)
  } catch (error) {
    throw Error(error.message)
  }
}

const createGame = async(name, description, platform, background_image, released, rating, genres) => {
  try {  
    const idsG = await validate("g", genres);
    const idsP = await validate("p", platform);

    const newGame = await Videogame.create({name, description, platform, background_image, released, rating});

    await setGenres(newGame, idsG);
    await setPlataforms(newGame, idsP)

    return newGame;
  } catch (error) {
    throw Error(`Error al crear el juego: ${error.message}`)
  }
}




/////////////////////////////////////////////////////////////////// CONTROLLERS ///////////////////////////////////////////////////////////////////

const getGames = async (name) => {
     const gamesDB = await getDB (name);
     const gamesAPI = await getAPI(name);
     const result = gamesDB.concat(gamesAPI);
     return result
}

const getByID = async (id) => {
    return !isNaN(id) ? getIdAPI(id) : getIdDB(id);     
}

const postGame = async (name, description, platform, background_image, released, rating, genres) => {

  if(![name, description, platform, background_image, released, rating, genres].every(Boolean)) throw Error ("Faltan datos");
  try {
    const newGame = createGame(name, description, platform, background_image, released, rating, genres)
    return newGame;
  } catch (error) {
    throw Error(error.message)
  }
}



module.exports={
    getGames,
    getByID,
    postGame,   
}