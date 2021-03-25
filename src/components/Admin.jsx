import React from 'react'
import Nav from "./Nav";
import { useHistory } from "react-router-dom";


const Admin = () => {
    let history = useHistory();
    return (
        <div className="containerInicio flex">
            <Nav/>
            <div className="divAdmin" data-aos="zoom-in">
                <div ><button className="btn btn-dark" onClick={()=>{history.push("/crearUsuario")}}>Crear Usuario</button></div>
                <div ><button className="btn btn-danger">Modificar Usuario</button></div>
                <div ><button className="btn btn-info">Modificar Clases</button></div>
                <div ><button className="btn btn-primary">Filtrar Usuarios</button></div>
            </div>
        </div>
    )
}

export default Admin
