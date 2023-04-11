import React, {useEffect, useState} from "react";
import{useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom';
import style from './Paginas.module.css'

import Card from '../Card/Card';
import Paginado from '../Paginado/Paginado'
import Filter from "../Filters/Filter"
import NoResult from "../NoResult/NoResult";

const Paginas = () => {
    const allGames = useSelector(state => state.gamesToDisplay);

    //logica paginado
    const[currentPage, setcurrentPage] = useState(1);
    const[perPage, setPerPage] = useState (12);
    const final = currentPage * perPage;
    const first = final - perPage;
    const currentGames = allGames.slice(first,final);
    const page = (pagNum)=>{setcurrentPage(pagNum)}

    //logica filtros
    const[order, setOrder] = useState ("none");
    const ord = (order) =>{setOrder(order)}

    return(
        <div className={style.container}>
            <div className={style.filters}>
                <Filter page={page} ord={ord}/>
            </div>
            <div className={style.paginatedAndCards}>
                <Paginado gamesPerPage={perPage} games={allGames.length} page={page} currentPage={currentPage}/>
                <div className={style.cardContainer}>
                    {
                        allGames.length ? currentGames.map(( (game,i) =><Link to={`/home/${game.id}`}><Card key={i} game={game}/></Link>)) : <NoResult/>
                    }
                </div>
            </div>
        </div>
    )
}

export default Paginas;