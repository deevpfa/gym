import React from 'react'
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";


const Nav = () => {
    let history = useHistory();
    return (
        <div className="containerNav" data-aos="fade-down">
            <nav>
                <ul className="lista-nav">
                    <li >
                        <Link className="nav-link" to="/inicio" >Inicio</Link>
                    </li>
                    <li>
                        <Link className="nav-link" to="/admin">Admin</Link>
                    </li>
                    <li className="botonNav" onClick={()=>{history.push("/")}}>
                        <div className="btn btn-dark btn-block "><Link className="nav-link" to="/">Cerrar Sesion</Link></div>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Nav