import axios from 'axios';
import {
  POST,

  GET_ALL_GAMES,
  GET_ALL_GENRES,
  GET_ALL_PLAT,

  GET_ID,
  CLEAN_DETAIL,

  RESET,
  CLEAN_PAGE,
  SEARCH_NAME,
  IS_SERCHING,

  FILTER,
  ADD_FILTER_GENRE,
  ADD_FILTER_PLATFORM,
  ADD_FILTER_STORE,

  ORDER_BY_RATING,
  ORDER_BY_ALPHA,
} from "./constantes";

export const post = (form) =>{
  return axios.post("http://localhost:3001/videogames", form)
}

//Get GAMES / GENRES / PLATFORMS
export const getGames = (name) => {
    return async function (dispatch) {
      const games = name ? await axios.get(`http://localhost:3001/videogames?name=${name}`) : await axios.get("http://localhost:3001/videogames/");
      const ref = name ? SEARCH_NAME : GET_ALL_GAMES
      const payload = games.data;
      return dispatch({ type: ref, payload});
    }
}

export const getGenres = () => {
    return async function (dispatch) {
      const dbGenres = await axios.get(`http://localhost:3001/genres`)
      const payload = dbGenres.data;
      return dispatch({ type: GET_ALL_GENRES, payload});
    }
}


export const getPlat = () => {
    return async function (dispatch) {
      const dbPlatforms = await axios.get(`http://localhost:3001/platforms`)
      const payload = dbPlatforms.data;
      return dispatch({ type: GET_ALL_PLAT, payload});
    }
}

//// GET BY ID/////////
export const getById = (id) => {
  return async function (dispatch) {
    const apiData = await axios.get(`http://localhost:3001/videogames/${id}`);
    const payload = apiData.data;
    dispatch({ type: GET_ID, payload });
  }
}

export const cleanDetail =() =>{
  return {type: CLEAN_DETAIL}
}


// ALL SEARCHING ACTIONS
export const cleanPage = () => {
  return {type: CLEAN_PAGE}
}

export const reset = () => {
  return {type: RESET}
}

export const isSearching = () =>{
  return {type: IS_SERCHING}
}


// ALL FILTER ACTIONS
export const filter = (payload) =>{
  return {type: FILTER, payload}
}

export const addFilterGenres = (payload) => {
  return {type: ADD_FILTER_GENRE, payload}
}

export const addFilterPlatform = (payload) => {
  return {type: ADD_FILTER_PLATFORM, payload}
}

export const addFilterStore = (payload) => {
  return {type: ADD_FILTER_STORE, payload}
}


// ALL ORDER ACTIONS
export const orderRating = (payload) => {
  return {type: ORDER_BY_RATING, payload}
}

export const orderAlpha = (payload) => {
  return {type: ORDER_BY_ALPHA, payload}
}



