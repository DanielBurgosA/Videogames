import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { getGames, getGenres, getPlat, post } from "../../redux/actions";
import style from "./Form.module.css"
import axios from "axios";


const Form = ()=> {
    //form vacio
    const initialForm = {
        name: "",
        background_image: "",
        description: "",
        genres: [],
        released: "",
        rating: "0,25",
        platform: [],
      }
    // para filtrar variables
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getGenres());
        dispatch(getPlat ());
    }, [dispatch]);

    const genres = useSelector(state=> state.genres)
    const platforms = useSelector(state=> state.platforms)

    //seteo el form y los errores
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    

    const [loading, setLoading] = useState(false);
    const [incomplete, setIncomplete] = useState(false);

    const validation = (field) => {
        switch (field) {
            case "name":
                if (!form.name.trim()||!form.name) setErrors({ ...errors, name: "A name is required" });
                else delete errors.name;
                break;
        
            case "description":
                if (!form.description.trim()||!form.description) setErrors({ ...errors, description: "A description is required" });
                else delete errors.description;
                break;
                
            case "genres":
                if (!form.genres.length) setErrors({ ...errors, genres: "At least one genre must be selectioned"});
                else delete errors.genres;
                break;

            case "platform":
                if (!form.platform.length) setErrors({ ...errors, platform: "At least one platform must be selectioned"});
                else delete errors.platform;
                break;

            default:
                setErrors({ ...errors, [field.slice(1)]: `Max 4 ${field.slice(1)}`});
        }
      };
    
    const handleChange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        setForm({...form, [name] : value});
        if(e.target.name==="released" || e.target.name==="rating" || e.target.name==="background_image") return
        validation(name);
    }

    const handleD = (e) =>{
        noMas(e);
        validarD(e.target.name);
    }

    const noMas = (e) =>{
        e.preventDefault();
        const {name, value} = e.target;

        if (value === "Platform" || value === "Genres") return

        //valido si agrego  o elimino
        const arr = [...validaEliminar(name,value)];

        //valido si me pase de 4
        if(arr.length>4){
            validation("_"+name)
            return
        }
        agregar(arr, name);
    }

    const validaEliminar = (name, value) =>{
        const arr =  [...form[name]]

        if(arr.includes(value)) arr = [...arr.filter(e=>e!==value)]
        else arr.push(value)
        
        return arr;
    }

    const agregar = (arr, name) =>{
        setForm({...form, [name] : [ ...arr]});
    }

    const validarD = (name) =>{
        validation(name);  
    }

    const handleSubmit = (e) =>{
        e.preventDefault();

        validation("name");
        validation("description");
        validation("genres");
        validation("platform");

       if(!form.background_image) setForm({...form, background_image: "https://www.nintenderos.com/wp-content/uploads/2018/08/Pokemon-Let%E2%80%99s-Go-Pikachu-Eevee-game-freak-desarrollo-logo.jpg"})

        if (!form.name || !form.description || !form.platform.length || !form.genres.length ) {
            setLoading(false);
            return setIncomplete(true);
          }incomplete
        
          if (Object.keys(errors).length) {
            setLoading(false);
            
            return setIncomplete(true);
          }

            setLoading(true);

        post(form)
        .then((res) => {
            setLoading(false);
            alert("Game created succesfully!");
        })
        .catch((error) => {
            alert("An error occurred. please try again later:" + error.message);
        });
    };
      


    return(
        <div className={style.body}>
            <div className={style.mainContainer}>
                <form onSubmit={handleSubmit} className={style.formContainer}>
                    <h1 className={style.title}>Create your own game!</h1>
        
                    <div className={style.inputContainer}>
                        <input
                            className={style.input}
                            name="name"
                            type="text"
                            value={form.name}
                            onChange={handleChange}
                            onBlur={() => validation("name")}
                            placeholder="Name"
                        />
                        {errors.name && <p className={style.error}>{errors.name}</p>}
                    </div>
        
                    <div className={style.inputContainer}>
                        <label className={style.releaseDate}>Enter a release date</label>
                            <input
                                className={style.input}
                                type="date"
                                value={form.released}
                                onChange={handleChange}
                                name="released"
                                placeholder="Released"
                            />
                    </div>
        
                    <div className={style.descriptionContainer}>
                        <textarea
                            className={style.description}
                            name="description"
                            type="text"
                            value={form.description}
                            onChange={handleChange}
                            onBlur={() => validation("description")}
                            placeholder="Description"
                        />
                        {errors.description && (<p className={style.error}>{errors.description}</p> )}
                    </div>
        
                    <div className={style.selectContainer}>
                        <select className={style.select} name="genres" onChange={handleD}>
                            <option value="Genres" className={style.genres}>Genres</option>
                                {genres?.map((g, i) => (<option key={i} value={g.name} className={form.genres.includes(g.name)?style.selectd:"a" }>{g.name}</option>))}
                        </select>
                        {errors.genres && <p className={style.errorG}>{errors.genres}</p>}
                    </div>
        
                    <div className={style.inputContainer}>
                        <input className={style.input} type="text" value={form.background_image} onChange={handleChange} name="background_image" placeholder="Imagen"/>
                    </div>
        
                    <div className={style.inputContainer}>
                        <input className={style.rating} type="number" value={form.rating} onChange={handleChange} name="rating" placeholder="Rating" 
                            min="0.0"
                            max="5"
                            step="0.5"
                        />
                    </div>

                    <div className={style.selectContainer}>
                        <select className={style.select} name="platform" onChange={handleD}>
                            <option value="Platform" className={style.genres}>Platforms</option>
                                {platforms?.map((p, i) => (<option key={i} value={p.name} className={form.platform.includes(p.name)?style.selectd:"a" }>{p.name}</option>))}
                        </select>
                        {errors.platform && <p className={style.errorP}>{errors.platform}</p>}
                    </div>

                    <div className={style.submitContainer}>
                        <button className={style.submit} type="submit">SUBMIT</button>
                    </div>
                </form>
            </div>
      </div>
    )
}

export default Form;