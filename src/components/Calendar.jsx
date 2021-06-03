import React, { useRef, useState, useEffect} from 'react'
import {turnosCalendario,bookShift,getData,pad} from '../utils/functions'
import { useParams } from "react-router-dom";
import { server } from "../utils/global";
import Nav from "./Nav";
import WhatsApp from "./WhatsApp";



const Calendar = () => {
    async function loadButton() {
        getData().then((res)=>{setAdmin(res.isAdmin);turnosCalendario(diaTurnosApi,clase,numeroMes,horasRef,setTurno,res.isAdmin,loaderRef,setSemanal)})
    }
    // setTimeout(() => {
    //     window.location.reload()
    // }, 100000);
    const {clase} = useParams()
    const [tope, setTope] = useState(0)
    const [admin, setAdmin] = useState()
    useEffect(() => {
        loadButton()
        obtenerClase()
    }, [])
    const horasRef = useRef(null)
    const loaderRef = useRef(null)
    const containerAllRef = useRef(null)
    const [turno, setTurno] = useState("")
    const [nombreClase, setNombreClase] = useState("")
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    const dias = ["","Lun", "Mar", "Mier", "Jue", "Vie", "Sab", "Domingo"]
    const [hoy,setHoy] = useState(new Date())
    const [nombreDia, setNombreDia] = useState(hoy.getDay())
    const [numeroDia, setNumeroDia] = useState(hoy.getDate())
    const [semanal, setSemanal] = useState()
    var diaTurnosApi = numeroDia 
    var mesTurnoApi
    const [numeroMes, setNumeroMes] = useState(hoy.getMonth())
    async function obtenerClase() {
        const nombreClase = await fetch(`${server}/clases/claseId/${clase}`)
        .then(response => response.json()) 
        setNombreClase(nombreClase)
    }
    function changeDias(e,days,r) {
        e.preventDefault()
        e.target.setAttribute("disabled","")
        horasRef.current.innerHTML = ""
        loaderRef.current.removeAttribute("hidden")
        if(nombreDia===6 && r==="add") hoy.setDate(hoy.getDate() + 2)
        else if(nombreDia===1 && r==="rest") hoy.setDate(hoy.getDate() - 2)
        else hoy.setDate(hoy.getDate() + days)
        // if (tope < 1) {
            // setTope(tope + 1)
            setNumeroMes(hoy.getMonth())
            setNombreDia(hoy.getDay())
            setNumeroDia(hoy.getDate())
            diaTurnosApi=hoy.getDate()
            mesTurnoApi=hoy.getMonth()
            turnosCalendario(diaTurnosApi,clase,mesTurnoApi,horasRef,setTurno,admin,loaderRef,setSemanal).then(setTimeout(()=> e.target.removeAttribute("disabled"), 450))
           
            // }
        
        }
        return (

        <div>
            <div  ref={containerAllRef} className="flex column">
            <p className="semanal">Te quedan {semanal} reservas semanales</p>
            <div className="calendar" >
                <div className="calendar__Info" >
                    <button className="calendar__Prev" onClick={(e) => { changeDias(e,-1,"rest") }}>&#9664;</button>
                    <div className="calendar__Day">{dias[nombreDia]}</div>
                    <div className="calendar__Day">{numeroDia}</div>
                    <div className="calendar__Month" >{meses[numeroMes]}</div>
                    <button className="calendar__Next" onClick={(e) => { changeDias(e,1,"add") }}>&#9654;</button>
                </div>
                <div className="calendar__Dia" ref={horasRef} ></div>
                <div className="loading-div" ref={loaderRef} >
                    <div className="loading loading--full-height"></div>
                </div>
                <div className="endCalendar"> __________________________</div>
            </div>
            </div>
            {
                turno !== "" ? bookShift(turno,setTurno,containerAllRef,nombreClase) : ""
            }
            <WhatsApp/>
        </div>
    )
}

export default Calendar
