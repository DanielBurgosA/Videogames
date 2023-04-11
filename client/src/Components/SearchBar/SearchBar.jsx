import { useDispatch } from "react-redux";
import { useState } from "react";
import { getGames, isSearching, cleanPage } from "../../redux/actions";
import style from "./SearchBar.module.css";

const SearchBar = () => {

  const dispatch = useDispatch();
  const [name, setName] = useState(""); 

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function HandleSubmit(e) {
    e.preventDefault();
    dispatch(isSearching());
    dispatch(cleanPage());
    dispatch(getGames(e.target.value));
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      HandleSubmit(event);
    }
  };

  return (
    <div className={style.searchbar}>
      <input
        className={style.search}
        type="text"
        placeholder="Search your game..."
        onChange={handleInputChange}
        value={name}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default SearchBar;
