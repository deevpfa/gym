import React, { useRef, useState, useEffect} from 'react'
import {contador,turnosCalendario} from '../utils/functions'
import { useParams } from "react-router-dom";
import Nav from "./Nav";
const Calendar = () => {
    const {clase} = useParams()
    const [tope, setTope] = useState(0)
    useEffect(() => {
        contador(contadorMax,numeroMes)
        turnosCalendario(diaTurnosApi,clase,numeroMes,horasRef,setTurno)
    }, [])
    const horasRef = useRef(null)
    const [turno, setTurno] = useState("")
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    const dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]
    const hoy = new Date()
    const [nombreDia, setNombreDia] = useState(hoy.getDay())
    const [numeroDia, setNumeroDia] = useState(hoy.getDate())
    var diaTurnosApi = hoy.getDate() 
    const [numeroMes, setNumeroMes] = useState(hoy.getMonth())
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
            
            turnosCalendario(diaTurnosApi,clase,numeroMes,horasRef,setTurno)
            
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

            turnosCalendario(diaTurnosApi,clase,numeroMes,horasRef,setTurno)
        }
        else { }
    }
    return (

        <div className="containerInicio flex">

            <Nav />
            <div className="calendar" >
                <div className="calendar__Info">
                    <div className="calendar__Prev" onClick={() => { retrocederDia() }}>&#9664;</div>
                    <div className="calendar__Day">{dias[nombreDia - 1].substr(0, 3)}</div>
                    <div className="calendar__Day">{numeroDia}</div>
                    <div className="calendar__Month" >{meses[numeroMes]}</div>
                    <div className="calendar__Next" onClick={() => { aumentarDia() }}>&#9654;</div>
                </div>
                <div className="calendar__Dia" ref={horasRef} data-aos="flip-up" ></div>
                {
                    turno !== "" ? <button className="btn btn-success btn-block mt-3" data-aos="flip-up">Confirmar Turno  {turno.innerHTML.substr(0, 5)}hs</button> : ""
                }
            </div>
        </div>
    )
}

export default Calendar
