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
} from './constantes'

const initialState ={
    games: [],
    genres : [],
    platforms : [],
    gamesToDisplay : [],
    searchGames : [],
    searchStatus : 1,
    gamesFiltred : [],
    filtersGenre : [],
    filtersPlatform : [],
    filtersStore : [],
    game : [],
}

function rootReducer (state = initialState, action){
    switch (action.type) {

        case POST:
            return{...state}

        /// GET ALL////////////////////////////////////
        case GET_ALL_GAMES:
            const inicial = action.payload;
            return{...state, games:[...inicial], gamesToDisplay:[...inicial], gamesFiltred:[...inicial], searchGames:[...inicial], searchStatus: 0};

        case GET_ALL_GENRES:
            return{...state, genres:action.payload};

        case GET_ALL_PLAT:
            return{...state, platforms:action.payload};

        case GET_ID:
            return { ...state, game: action.payload };
        
        case CLEAN_DETAIL:
            return {...state, game:[]};

        /// SEARCH LOGIC
        case RESET:
            return {...state, gamesToDisplay:[...state.games], searchStatus: 0}

        case CLEAN_PAGE:
            return {...state, gamesToDisplay:[]}

        case SEARCH_NAME:
            return{...state, gamesToDisplay: action.payload, searchGames: action.payload, searchStatus:2}

        case IS_SERCHING:
            return{...state, searchStatus:1}

        ///FILTER LOGIC///////////////////
        case FILTER:
            if(!state.filtersGenre.length&&!state.filtersPlatform.length){
                if(state.searchStatus>1) {
                    console.log("1");
                    return   {...state, gamesToDisplay : [...state.searchGames], gamesFiltred : [...state.searchGames]}
                }
                else {
                    console.log("2");
                    return {...state, gamesToDisplay : [...state.games], gamesFiltred : [...state.games]}
                }
            }     
            else{
                let toFilter =  !state.searchStatus>1? [...state.games]: [...state.searchGames]
                /// Store filter
                if(state.filtersStore.length) toFilter = toFilter.filter((game)=>game.created===state.filtersStore[0])
                /// platforms filter
                if(state.filtersPlatform.length&&toFilter.length){
                    const filtres = [...state.filtersPlatform]
                    toFilter = toFilter.filter((game) => filtres.some((f)=>game.platform.includes(f)))
                }
                /// genres filter
                if(state.filtersGenre.length&&toFilter.length){
                    const filtres = [...state.filtersGenre]
                    toFilter = toFilter.filter((game) => filtres.every((f)=>game.genres.includes(f)))
                    console.log("1");
                    }
                return {...state, gamesToDisplay : [...toFilter], gamesFiltred : [...toFilter]}
            }
            

        case ADD_FILTER_GENRE:
            if (action.payload==="all") return {...state, filtersGenre:[]}
            else{
                let array = [...state.filtersGenre]
                array.includes(action.payload)? array=array.filter(f=>f!==action.payload) : array.push(action.payload);
                return {...state, filtersGenre : array}
            }

        case ADD_FILTER_PLATFORM:
            if (action.payload==="all") return {...state, filtersPlatform:[]}
            else{
                let array = [...state.filtersPlatform]
                array.includes(action.payload)? array=array.filter(f=>f!==action.payload) : array.push(action.payload);
                return {...state, filtersPlatform : array}
            }

        case ADD_FILTER_STORE: 
            if (action.payload==="all") return {...state, filtersStore:[]}
            else return {...state, filtersStore:[action.payload]}

        


        /////// SORT ////////////////////////////////

        case ORDER_BY_RATING:
            if (!state.gamesToDisplay.length) return {...state}
            if (action.payload ==='none') return{...state, gamesToDisplay: [...state.gamesFiltred]};
            
            else{
                const toFilter = [...state.gamesFiltred];
                let sorted = action.payload === "Bot" ? toFilter.sort((a, b) => { 
                    if (a.rating > b.rating) return 1;
                    if (a.rating < b.rating) return -1;
                    return 0;
                }) : toFilter.sort((a, b) => {
                    if (a.rating > b.rating) return -1;
                    if (a.rating < b.rating) return 1;
                    return 0;
                });
                return { ...state, gamesToDisplay:[...sorted] };
            }

        case ORDER_BY_ALPHA:
            if (!state.gamesToDisplay.length) return {...state}
            if (action.payload ==='none') return{...state, gamesToDisplay: [...state.gamesFiltred]};
        
            else{
                const toFilter = [...state.gamesToDisplay];
                let sorted = action.payload === "A-Z" ? toFilter.sort((a, b) => {
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    return 0;
                }) : toFilter.sort((a, b) => {
                    if (a.name > b.name) return -1;
                    if (a.name < b.name) return 1;
                    return 0;
                });

                return { ...state, gamesToDisplay:[...sorted] };
            }
            
        default:
            return state
    }
}

export default rootReducer;