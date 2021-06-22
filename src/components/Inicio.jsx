import React, { useState, useEffect, useRef,useContext} from 'react'
import Footer from "./Footer";
import WhatsApp from "./WhatsApp";
import { useHistory } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { datosClases, crearClases } from '../utils/functions'
import { UserContext } from './UserContext';
import sad from "../assets/sad.svg";





const Inicio = () => {
    let history = useHistory();

    useEffect(() => {
        setStateNav("home")
        let arrayClases = []
        async function obtenerDatos() {
            let datos = await datosClases(token.nombreUser)
            if(!datos) setError("No hay clases")
            if (datos.exito) {
                if(datos.exito[0]===null) return
                datos.exito.forEach(element => { arrayClases.push(element) })
                crearClases(clasesRef, arrayClases, history)
            }
            else if (datos.vencido){
                setVencido(true)
            }
            else {
                setError(datos.error)
            }
        }
        obtenerDatos()

    }, [])
    
    const {setStateNav} = useContext(UserContext)
    const clasesRef = useRef(null)
    const [setError] = useState("")
    const [vencido, setVencido] = useState("")
    const token = decodeToken(localStorage.getItem("token"))
    return (
        <div className="containerInicio">
            {
                vencido===true ? <div className="vencido"><img src={sad} alt=""/><p>Lo sentimos, su cuota ha vencido, no puede seguir reservando...</p></div>
                :<div className="divInicio" ref={clasesRef}></div>
            }
            <WhatsApp/>
            <Footer/>
        </div>
    )
}

export default Inicio
