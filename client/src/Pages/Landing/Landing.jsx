import {NavLink} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { getGames } from '../../redux/actions';
import style from "./Landing.Module.css"

const Landing = ()=> {

    return(
        <div className={style.hola}>
            <NavLink to="/home"> <button> S T A R T </button></NavLink>
        </div>
    )
}

export default Landing;