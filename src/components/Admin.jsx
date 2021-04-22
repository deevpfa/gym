import React from 'react'
import Nav from "./Nav";
import { useHistory } from "react-router-dom";
import { getData } from "../utils/functions";


const Admin = () => {
    let history = useHistory();
    getData().then((res)=>{if(res.isAdmin ===false) history.push("/")})
    return (
        <div className="containerInicio flex column">
            <Nav/>
            <div className="divAdmin" data-aos="zoom-in">
                <div ><button className="btn btn-dark" onClick={()=>{history.push("/crearUsuario")}}>Crear Usuario</button></div>
                <div ><button className="btn btn-danger" onClick={()=>{history.push("/addClass")}}>Agregar Clase</button></div>
                <div ><button className="btn btn-info" onClick={()=>{history.push("/turnos")}}>Agregar Turno</button></div>
                <div ><button className="btn btn-primary" onClick={()=>{history.push("/ViewReservas")}}>Ver Reservas</button></div>
                <div ><button className="btn btn-primary" onClick={()=>{history.push("/ViewReservas")}}>Actualizar Usuario</button></div>
            </div>
        </div>
    )
}

export default Admin
