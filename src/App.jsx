
import './App.css';
import {useEffect} from 'react';
import { BrowserRouter as Router,Switch,Route } from "react-router-dom";
import Login from "./components/Login";
import Inicio from "./components/Inicio";
import Calendar from "./components/Calendar";

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
          <Route path="/calendar" component={Calendar}></Route>
          <Route path="/inicio" component={Inicio}></Route>
          <Route path="/" component={Login}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
