
import './App.css';
import React, { useMemo } from 'react'
import {useEffect,useState} from 'react';
import { BrowserRouter as Router,Switch,Route } from "react-router-dom";
import Login from "./components/Login";
import Inicio from "./components/Inicio";
import Calendar from "./components/Calendar";
import Admin from "./components/Admin";
import Profile from "./components/Profile";
import AddClass from "./components/AddClass";
import Nav from "./components/Nav";
import Turnos from "./components/Turnos";
import Users from "./components/Users";
import Background from "./components/Background";
import ViewReservas from "./components/ViewReservas";

import { UserContext } from "./components/UserContext";



import Aos from "aos";
import 'aos/dist/aos.css'


function App() {
  useEffect(() => {
    Aos.init()
  }, [])
  const [stateNav,setStateNav] = useState()
  const providerValue = useMemo(()=>({stateNav,setStateNav}),[stateNav,setStateNav])
  
  return (
    <div className="App">   
      <Router>
        <Switch>
            <Route exact path="/" component={Login}></Route>
          <UserContext.Provider value={providerValue}>
            <Nav/>
            <Background/>
            <Route path="/calendar/:clase" component={Calendar}></Route>
            <Route path="/admin" component={Admin}></Route>
            <Route path="/viewReservas" component={ViewReservas}></Route>
            <Route path="/inicio" component={Inicio}></Route>
            <Route path="/users" component={Users}></Route>
            <Route path="/addclass" component={AddClass}></Route>
            <Route path="/profile" component={Profile}></Route>
            <Route path="/turnos" component={Turnos}></Route>
          </UserContext.Provider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
