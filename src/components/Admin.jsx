import React,{useContext,useEffect} from 'react'
import { useHistory } from "react-router-dom";
import { getData } from "../utils/functions";
import adminUsers from "../assets/adminUsers.svg";
import newClass from "../assets/newClass.svg";
import newShift from "../assets/newShift.svg";
import calendario from "../assets/calendario.svg";
import { UserContext } from './UserContext';





const Admin = () => {
    useEffect(() => {
        setStateNav("admin")
    }, [])
    let history = useHistory();
    getData().then((res)=>{if(res.isAdmin ===false) history.push("/")})
    const {setStateNav} = useContext(UserContext)
    return (
        <div className="containerInicio flex column">
            <div className="divAdmin" data-aos="zoom-in">
                <div  onClick={()=>{history.push("/users")}}> <img src={adminUsers} alt=""/> <p className="adminParrafo1">Administrar Usuarios</p> <p className="adminParrafo2"> Administra los usuarios registrados</p></div>
                <div  onClick={()=>{history.push("/turnos")}}><img src={newShift} alt=""/> <p className="adminParrafo1">Agregar Turno</p> <p className="adminParrafo2"> Sube un excel con las nuevas clases </p></div>
                <div  onClick={()=>{history.push("/ViewReservas")}}><img src={calendario} alt=""/> <p className="adminParrafo1">Ver Reservas</p> <p className="adminParrafo2">Lista las reservas de un dia y clase en particular</p></div>
                {/* <div  onClick={()=>{history.push("/addClass")}}><img src={newClass} alt=""/> <p className="adminParrafo1">Agregar Clase</p> <p className="adminParrafo2"> Carga una clase nueva </p></div> */}
            </div>
        </div>
    )
}

export default Admin
