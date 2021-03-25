import React, { useRef, useState, useEffect } from 'react'
import Nav from "./Nav";
const Calendar = () => {
    useEffect(() => {
        contador()
        turnosCalendario()
    }, [])
    const horasRef = useRef(null)
    const [turno, setTurno] = useState("")
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    const dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]
    const hoy = new Date()
    const [nombreDia, setNombreDia] = useState(hoy.getDay())
    const [numeroDia, setNumeroDia] = useState(hoy.getDate())
    const [numeroMes, setNumeroMes] = useState(hoy.getMonth())
    const [tope, setTope] = useState(0)
    let contadorMax = 1
    function contador() {
        if (numeroMes === 0 || numeroMes === 2 || numeroMes === 4 || numeroMes === 6 || numeroMes === 7 || numeroMes === 9 || numeroMes === 11) {
            contadorMax = 1
        }
        else if (numeroMes === 3 || numeroMes === 5 || numeroMes === 8 || numeroMes === 10) {
            contadorMax = 0
        }
        else {
            contadorMax = -1
        }
    }
    async function aumentarDia() {
        if (tope < 1) {
            
            setTope(tope + 1)
            await nombreDia === 6 ? setNombreDia(1) : setNombreDia(nombreDia + 1);
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
                await setNumeroDia(numeroDia + 1)
                
            }

            await turnosCalendario()
        }
        else { }
    }
    async function retrocederDia() {
        if (tope === 1) {

            setTope(0)
            await nombreDia === 1 ? setNombreDia(6) : setNombreDia(nombreDia - 1);

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
            else {
                await setNumeroDia(numeroDia - 1)
            }
            await turnosCalendario()
        }
        else { }
    }
    console.log(numeroDia);
    function seleccionaTurno(e) {
        let arrayChilds = horasRef.current.childNodes
        arrayChilds.forEach(element => {
            element.style.background = 'transparent'
        });

        if (e.innerHTML.substr(0, 2) === "Di") {
            e.parentNode.style.background = 'rgb(94, 93, 93)'
            setTurno(e.parentNode)
            return
        }
        e.style.background = 'rgb(94, 93, 93)'
        setTurno(e)
    }

    function horarios() {
        horasRef.current.innerHTML = ""
        for (let i = 0; i < arrayTurnos.length; i++) {
            let element = arrayTurnos[i]
            let p = document.createElement("p")
            let div = document.createElement('div')
            div.classList.add("calendar__Item")
            p.classList.add("parrafo")
            p.innerHTML = `Disponibles: ${element.disponibles}`
            div.innerHTML = `${element.horarios}:00 `
            div.onclick = (e) => seleccionaTurno(e.target)
            div.appendChild(p)
            horasRef.current.appendChild(div)
        }
    }


    /// consulta turnos
    let arrayTurnos = []
    var date = `${numeroDia}-${numeroMes + 1}-${hoy.getFullYear()}`
    function turnosCalendario() {
        var data = {
            date: date
        }
        fetch(`http://localhost:5000/turnos/musculacion/consulta`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                arrayTurnos = []
                data.forEach(element => { arrayTurnos.push(element) })
            })
            .then(() => horarios())
    }



    return (

        <div className="containerInicio flex">

            <Nav />
            <div className="calendar">
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
