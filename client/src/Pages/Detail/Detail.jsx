import {
    cleanDetail,
    getById,
    reset
  } from "../../redux/actions";
  
  import { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { useLocation, useParams, Link } from "react-router-dom";
  
  
  const Detail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    let game = useSelector((state) => state.game);  

    console.log(id);
    
    useEffect(() => {
      dispatch(getById(id));
      return () => {
        dispatch(cleanDetail());
      };
    }, [dispatch, id]);    

    
      
    return (
        <div>
            <div>{game.name}</div>
            <img src={game.background_image} alt="" />
            <div>{game.esrb}</div>
            <div>{game.rating}</div>
            <div>{game.released}</div>
            <div>{game.genres}</div>
            <div>{game.description}</div>
            <div>{game.developers}</div>
        </div>
    )
} 
  export default Detail;
  