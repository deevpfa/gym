import React, { useRef, useState, useEffect} from 'react'
import {contador,turnosCalendario,bookShift,getData} from '../utils/functions'
import { useParams } from "react-router-dom";
import { server } from "../utils/global";
import Nav from "./Nav";
import WhatsApp from "./WhatsApp";



const Calendar = () => {
    async function loadButton() {
        getData().then((res)=>{setAdmin(res.isAdmin);turnosCalendario(diaTurnosApi,clase,numeroMes,horasRef,setTurno,res.isAdmin)})
    }
    const {clase} = useParams()
    const [tope, setTope] = useState(0)
    const [admin, setAdmin] = useState()
    useEffect(() => {
        contador(contadorMax,numeroMes)
        loadButton()
        obtenerClase()
    }, [])
    const horasRef = useRef(null)
    const containerAllRef = useRef(null)
    const [turno, setTurno] = useState("")
    const [nombreClase, setNombreClase] = useState("")
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    const dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]
    const hoy = new Date()
    const [nombreDia, setNombreDia] = useState(hoy.getDay())
    const [numeroDia, setNumeroDia] = useState(hoy.getDate())
    var diaTurnosApi = hoy.getDate() 
    const [numeroMes, setNumeroMes] = useState(hoy.getMonth())
    async function obtenerClase() {
        const nombreClase = await fetch(`${server}/clases/claseId/${clase}`)
        .then(response => response.json()) 
        setNombreClase(nombreClase)
    }
    let contadorMax = 1
    function aumentarDia() {
        if (tope < 1) {
            
            setTope(tope + 1)
            nombreDia === 6 ? setNombreDia(1) : setNombreDia(nombreDia + 1);
            if (contadorMax === 1 && numeroDia === 31) {
                setNumeroDia(1)
                setNumeroMes(numeroMes + 1)
            }
            else if (contadorMax === 0 && numeroDia === 30) {
                setNumeroDia(1)
                setNumeroMes(numeroMes + 1)
            }
            else if (contadorMax === -1 && numeroDia === 28) {
                setNumeroDia(1)
                setNumeroMes(numeroMes + 1)
            }
            else if (nombreDia === 6) {
                setNumeroDia(numeroDia + 2)
            }
            else {
                setNumeroDia(numeroDia + 1)
                diaTurnosApi+=1
                
            }
            
            turnosCalendario(diaTurnosApi,clase,numeroMes,horasRef,setTurno,admin)
            
        }
        else {}
    }
  function retrocederDia() {
        if (tope === 1) {

            setTope(0)
            nombreDia === 1 ? setNombreDia(6) : setNombreDia(nombreDia - 1);

            if (contadorMax === 1 && numeroDia === 1 && numeroMes !== 2) {
                setNumeroDia(30)
                setNumeroMes(numeroMes - 1)
            }
            else if (contadorMax === 0 && numeroDia === 1) {
                setNumeroDia(31)
                setNumeroMes(numeroMes - 1)
            }
            else if (numeroMes === 2 && numeroDia === 1) {
                setNumeroDia(28)
                setNumeroMes(numeroMes - 1)
            }
            else if (nombreDia === 1) {
                setNumeroDia(numeroDia - 2)
            }
            else{
                setNumeroDia(numeroDia -1)
            }

            turnosCalendario(diaTurnosApi,clase,numeroMes,horasRef,setTurno,admin)
        }
        else { }
    }
    return (

        <div>
            <div  ref={containerAllRef} className="flex column">
            <Nav />
            <div className="calendar" >
                <div className="calendar__Info" >
                    <div className="calendar__Prev" onClick={() => { retrocederDia() }}>&#9664;</div>
                    <div className="calendar__Day">{dias[nombreDia - 1].substr(0, 3)}</div>
                    <div className="calendar__Day">{numeroDia}</div>
                    <div className="calendar__Month" >{meses[numeroMes]}</div>
                    <div className="calendar__Next" onClick={() => { aumentarDia() }}>&#9654;</div>
                </div>
                <div className="calendar__Dia" ref={horasRef} ></div>
                
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
