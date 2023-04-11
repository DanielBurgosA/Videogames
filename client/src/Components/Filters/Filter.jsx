import React, {useEffect, useState,} from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Filter.module.css"

import { addFilterGenres, addFilterPlatform, addFilterStore, filter,
     orderRating, orderAlpha, reset, } from "../../redux/actions";

const Filter = ({page, ord}) => {
    const allGenres = useSelector(state=>state.genres)
    const allPlatfrom = useSelector(state=>state.platforms)

    const filtersGenre = useSelector(state=>state.filtersGenre)
    const filtersPlatform = useSelector(state=>state.filtersPlatform)
    const filtersStore = useSelector(state=>state.filtersStore)
    const dispatch = useDispatch();

    //filtros//
    useEffect(() => {
        dispatch(filter());
        page(1);
      }, [filtersGenre, filtersPlatform, filtersStore]);

    const handlerFGenres = (value) =>{
        dispatch(addFilterGenres(value))
    }

    const handlerFPlatform = (value) =>{
        dispatch(addFilterPlatform(value))
    }

    const handlerFStore = (value) => {
        dispatch(addFilterStore(value))
    }

    ///////////////// SORT //////////////////////

    const handlerOR = (e) => {
        e.preventDefault()
        dispatch(orderRating(e.target.value));
        page(1);
        ord("o"+e.target.value);
    }

    const handlerOA = (e) => {
        e.preventDefault()
        dispatch(orderAlpha(e.target.value));
        page(1);
        ord("a"+e.target.value);
    }


    //////// RESET ////////
    const handleReset = (e) =>{
        e.preventDefault();
        dispatch(reset());
        page(1);
        ord("r"+e.target.value);
    }


    ////////HTML//////////
    const [openGenre, setOpenGenre] = useState(false);
    const [openPlatform, setOpePlatform] = useState(false);
    const [openStorage, setOpenStorage] = useState(false);
   

    return (
        <div className={style.filt}>
            <div className={style.filterContainer}>
                <div className={style.alings}>

                    <div className={style.container} htmlFor = "filterGenres">
                        <div className = {!openGenre? style.selectbtn : style.open +" "+ style.selectbtn} onClick={()=> setOpenGenre(!openGenre)}>
                            <span className={style.btntext}>Select Genre</span>
                            <i className={style.flechaCont}><i className={style.flechaAbajo}></i></i>
                        </div>
                        <ul className={style.itemList +" " +(openGenre? style.opened : style.closed )} overflow="scroll">
                            {allGenres?.map(genre => {
                            return (
                                    <div className={filtersGenre.includes(genre.name)? style.item + " " + style.selected : style.item } onClick={()=>handlerFGenres(genre.name)}>
                                        <label className={style.itemText} key={genre.id+"gt"} htmlFor={genre.name}>{genre.name}</label>
                                    </div>
                                )})}
                        </ul>
                    </div>     


                    <div className={style.container} htmlFor = "filterPlatform">
                        <div className = {!openPlatform? style.selectbtn : style.open +" "+ style.selectbtn} onClick={()=> setOpePlatform(!openPlatform)}>
                            <span className={style.btntext}>Select Platform</span>
                            <i className={style.flechaCont}><i className={style.flechaAbajo}></i></i>
                        </div>
                        <ul className={style.itemList +" " +(openPlatform? style.opened : style.closed )} overflow="scroll">
                            {allPlatfrom?.map(platform => {
                            return (
                                    <div className={filtersPlatform.includes(platform.name)? style.item + " " + style.selected : style.item } onClick={()=>handlerFPlatform(platform.name)}>
                                        <label className={style.itemText} key={platform.id+"pt"} htmlFor={platform.name}>{platform.name}</label>
                                    </div>
                                )})}
                        </ul>
                    </div>


                    <div className={style.container} htmlFor = "filterStore">
                        <div className = {!openStorage? style.selectbtn : style.open +" "+ style.selectbtn} onClick={()=> setOpenStorage(!openStorage)}>
                            <span className={style.btntext}>Select Store</span>
                            <i className={style.flechaCont}><i className={style.flechaAbajo}></i></i>
                        </div>
                        <ul className={style.itemList +" " +(openStorage? style.opened : style.closed )} overflow="scroll">
                                <div className={!filtersStore.length? style.item + " " + style.selected : style.item } onClick={()=>handlerFStore("all")}>
                                    <label className={style.itemText} key={"allft"} htmlFor="all store">All</label>
                                </div>
                                <div className={filtersStore.length&&!filtersStore[0]? style.item + " " + style.selected : style.item } onClick={()=>handlerFStore(false)}>
                                    <label className={style.itemText} key={"0ft"} htmlFor={"0 store"}>On website</label>
                                </div>
                                <div className={filtersStore[0]? style.item + " " + style.selected : style.item } onClick={()=>handlerFStore(true)}>
                                    <label className={style.itemText} key={"1ft"} htmlFor={"1 store"}>Created</label>
                                </div>
                        </ul>
                    </div>

                    <div className={style.container} htmlFor = "filterStore">
                        <div className = {style.selectbtn}>
                            <span className={style.btntext}>Rating</span> 
                            <select className={style.itemList} name="Rating" id="Rating" onChange={e => handlerOR(e)}>
                                <option className={style.itemText} value="none">None</option>
                                <option className={style.itemText} value="Top">Top</option>
                                <option className={style.itemText} value="Bot">Bot</option>
                            </select>
                        </div>
                    </div>

                    <div className={style.container} htmlFor = "filterAlphabet">
                        <div className = {style.selectbtn}>
                            <span className={style.btntext}>Alphabet</span> 
                            <select className={style.itemList} name="Alfabet" id="Alfabet" onChange={e => handlerOA(e)}>
                                <option value="none">None</option>
                                <option value="A-Z">A-Z</option>
                                <option value="Z-A">Z-A</option>
                            </select>
                        </div>
                    </div>

                    <button className={style.button} value="reset" onClick={e=>handleReset(e)}>Reset</button>
                </div>
            </div> 
        </div>
    )
}

export default Filter;