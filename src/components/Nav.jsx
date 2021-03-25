import React from 'react'
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { decodeToken } from "react-jwt";


const Nav = () => {
    const token = decodeToken(localStorage.getItem("token"))
    const nombre = localStorage.getItem("nombre")
    let history = useHistory();
    return (
        <div className="containerNav" data-aos="fade-down">
            <nav>
                <ul className="lista-nav">
                    <li>
                        <Link className="nav-link" to="/inicio" >Inicio</Link>
                    </li>
                    {
                        token.isAdmin===true ? 
                        <li><Link className="nav-link" to="/admin">Admin</Link></li> : 
                        <li className="nombre">{nombre}</li>
                    }
                    <li onClick={()=>{history.push("/")}}>
                        <div className="btn btn-dark btn-block "><Link className="nav-link" to="/">Cerrar Sesion</Link></div>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Nav