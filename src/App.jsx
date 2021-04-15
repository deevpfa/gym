
import './App.css';
import React from 'react'
import {useEffect} from 'react';
import { BrowserRouter as Router,Switch,Route } from "react-router-dom";
import Login from "./components/Login";
import Inicio from "./components/Inicio";
import Calendar from "./components/Calendar";
import Admin from "./components/Admin";
import CrearUsuario from "./components/CrearUsuario";


import Aos from "aos";
import 'aos/dist/aos.css'


function App() {
  useEffect(() => {
    Aos.init()
  }, [])
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/calendar/:clase" component={Calendar}></Route>
          <Route path="/admin" component={Admin}></Route>
          <Route path="/inicio" component={Inicio}></Route>
          <Route path="/crearUsuario" component={CrearUsuario}></Route>
          <Route path="/" component={Login}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
