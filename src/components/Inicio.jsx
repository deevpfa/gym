import React,{useState,useEffect,useRef} from 'react'
import Nav from "./Nav";
import { useHistory } from "react-router-dom";
import { decodeToken } from "react-jwt";
import {datosClases,crearClases} from '../utils/functions'




const Inicio = () => {
    useEffect(() => {
        let arrayClases = []
        async function obtenerDatos() {
            let datos = await datosClases(token.nombreUser)
            if (datos.exito) {
                datos.exito.forEach(element => { arrayClases.push(element) })
                crearClases(clasesRef,arrayClases) 
            }
            else{
                setError(datos.error)
            }
        }
        obtenerDatos()
        
    }, [])
    const clasesRef = useRef(null)
    const [clases,setClases] = useState()
    const [error,setError] = useState("")
    const token = decodeToken(localStorage.getItem("token"))   
    let history = useHistory();


    return (
        <div className="containerInicio">
            <Nav/>
            <div className="divInicio" ref={clasesRef}></div>
        </div>
    )
}

export default Inicio
