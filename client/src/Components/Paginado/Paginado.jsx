import React from "react";
import style from './Paginado.module.css'

const Paginado = ({gamesPerPage, games, page, currentPage}) => {
    const pageNumbers = [];

    for(let i=1; i<=Math.ceil(games/gamesPerPage); i++){
        pageNumbers.push(i);
    }

    return(
        <div className={style.container}>
            <button className={style.unstyle + "" + currentPage===1?style.prevNot : style.prev} onClick={()=>page(currentPage-1)}>Back</button>       
            <div className={style.paginationButtonContainer}>
                {pageNumbers&&pageNumbers.map(num=>{
                    return(
                        <button className={style.unstyle + " "+style.paginationButton+" "+currentPage === num ? style.actual : ""} key={num} onClick={()=>page(num)}>{num}</button>
                    )}
                )}
            </div>
            <button className={style.unstyle + "" + currentPage===pageNumbers.length-1?style.nextNot : style.next} onClick={()=>page(currentPage-1)}>Next</button>   
        </div>
        
    )
}
export default Paginado;
