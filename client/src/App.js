import style from './App.module.css';
import React from 'react';
import {Landing, Detail, Form, Home} from './Pages'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';

function App() {

  const location = useLocation();

  return (
      <div className={style.App}>
        <div>
          {location.pathname !== '/' && <NavBar/>}
        </div>
        <Routes>
          <Route exact path = "" element ={<Landing/>}/>
          <Route exact path = "/home" element ={<Home/>}/>
          <Route exact path = "/home/:id" element ={<Detail/>}/>
          <Route exact path = "/create" element ={<Form/>}/>
        </Routes>
      
      </div>
  );
}

export default App;
