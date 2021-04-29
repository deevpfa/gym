import React, { useState, useEffect, useRef} from 'react'
import Nav from "./Nav";
import Footer from "./Footer";
import WhatsApp from "./WhatsApp";
import { useHistory } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { datosClases, crearClases } from '../utils/functions'





const Inicio = () => {
    let history = useHistory();

    useEffect(() => {
        let arrayClases = []
        async function obtenerDatos() {
            let datos = await datosClases(token.nombreUser)
            if(!datos) setError("No hay clases")
            if (datos.exito) {
                if(datos.exito[0]===null) return
                datos.exito.forEach(element => { arrayClases.push(element) })
                crearClases(clasesRef, arrayClases, history)
            }
            else {
                setError(datos.error)
            }
        }
        obtenerDatos()

    }, [])
    const clasesRef = useRef(null)
    const [error, setError] = useState("")
    const token = decodeToken(localStorage.getItem("token"))
    return (
        <div className="containerInicio">
            <Nav active="home"/>
            <div className="divInicio" ref={clasesRef}></div>
            <WhatsApp />
            <Footer/>
        </div>
    )
}

export default Inicio
