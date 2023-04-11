import style from "./NavBar.module.css"
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";


const NavBar = () => {
    const location = useLocation()

    ///funcion scroll
    const [scroll, setScroll] = useState(false);

    useEffect(() => {
      window.addEventListener("scroll", () => {
        setScroll(window.pageYOffset > 0);
      });
      return () => {
        window.removeEventListener("scroll");
      };
    }, []);

    return (
        <nav className={scroll? style.scrolled : style.nav}>
            <div className={style.buttons}>
                {location.pathname !== '/home' && <Link to={"/home"} className={style.link}>
                    <span className={style.Text}>HOME</span>
                </Link>}
                <Link to={"/create"}  className={style.link}>
                    <span className={style.Text}>CREATE</span>
                </Link>       
            </div>
            <div className={style.searchContainer}>
                <SearchBar />
            </div>  
        </nav>
    )
}
export default NavBar ;