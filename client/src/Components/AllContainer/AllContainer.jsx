import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getGames, getGenres, getPlat } from "../../redux/actions";
// react-redux//
import style from "./AllContainer.module.css"
import Paginas from "../Paginas/Paginas";
import Loader from "../Loader/Loader";

//inicializar all container
const AllContainer = () => {
    const allGames = useSelector(state=>state.games);
    const dispGames = useSelector(state=>state.gamesToDisplay)
    const searchStatus = useSelector(state=>state.searchStatus);


    const dispatch = useDispatch();

    useEffect(()=>{
        if (allGames.length) {
            return;
          }
        dispatch(getGames());
        dispatch(getGenres());
        dispatch(getPlat());
    }),[dispatch, allGames.length];

    if (!dispGames.length&&searchStatus) {
        return <div ><Loader/></div>;
      }  
    

    return (
        <div className={style.body}>
            <div className={style.container}>
                <Paginas/>
            </div>
        </div>
    )
}
export default AllContainer;