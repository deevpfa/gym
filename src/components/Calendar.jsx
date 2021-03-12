import React,{useState} from 'react'
import Nav from "./Nav";

const Calendar = () => {
    const meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
    const dias = ["Lunes","Martes","Miercoles", "Jueves", "Viernes","Sabado", "Domingo"]
    const hoy = new Date()
    const [nombreDia,setNombreDia] = useState(hoy.getDay())
    const [numeroDia,setNumeroDia] = useState(hoy.getDate())
    const [numeroMes,setNumeroMes] = useState(hoy.getMonth())
    let contadorMax = 1

    function contador() {
        if(numeroMes === 0 || numeroMes === 2 || numeroMes === 4 || numeroMes ===6 || numeroMes === 7 || numeroMes === 9 || numeroMes === 11){
            contadorMax = 1
        }
        else if(numeroMes === 3 || numeroMes === 5 || numeroMes === 8 || numeroMes === 10 ){
            contadorMax = 0
        }
        else{
            contadorMax = -1
        }
    }
    contador()
    function aumentarDia() {
        nombreDia===7 ? setNombreDia(1) : setNombreDia(nombreDia+1);
        if(contadorMax===1 && numeroDia ===31){
            setNumeroDia(1)
            setNumeroMes(numeroMes+1)
        }
        else if(contadorMax===0 && numeroDia===30){
            setNumeroDia(1)
            setNumeroMes(numeroMes+1)
        }
        else if (contadorMax === -1 && numeroDia===28){
            setNumeroDia(1)
            setNumeroMes(numeroMes+1)
        }
        else{
            setNumeroDia(numeroDia+1)
        }
    }
    function retrocederDia(params) {
        nombreDia===1 ? setNombreDia(7) : setNombreDia(nombreDia-1);
        console.log(numeroMes);
        if(contadorMax===1 && numeroDia ===1 && numeroMes!==2){
            setNumeroDia(30)
            setNumeroMes(numeroMes-1)
        }
        else if(contadorMax===0 && numeroDia===1){
            setNumeroDia(31)
            setNumeroMes(numeroMes-1)
        }
        else if (numeroMes===2 && numeroDia===1){
            setNumeroDia(28)
            setNumeroMes(numeroMes-1)
        }
        else{
            setNumeroDia(numeroDia-1)
        }
    }
    return (
        
        <div className="containerInicio">
            
            <Nav/>
            <div className="calendar">
                <div className="calendar__Info">
                    <div className="calendar__Prev" onClick={()=>{retrocederDia()}}>&#9664;</div>
                    <div className="calendar__Day">{dias[nombreDia-1].substr(0,3)}</div>
                    <div className="calendar__Day">{numeroDia}</div>
                    <div className="calendar__Month">{meses[numeroMes]}</div>
                    <div className="calendar__Next" onClick={()=>{aumentarDia()}}>&#9654;</div>
                </div>

                <div className="calendar__Week">
                    <div className="calendar__Day calendar__Item">L</div>
                    <div className="calendar__Day calendar__Item">M</div>
                    <div className="calendar__Day calendar__Item">Mi</div>
                    <div className="calendar__Day calendar__Item">J</div>
                    <div className="calendar__Day calendar__Item">V</div>
                    <div className="calendar__Day calendar__Item">S</div>
                    <div className="calendar__Day calendar__Item">D</div>
                </div>

                <div className="calendar__Dia" id="calendar__Dia"></div>
            </div>
        </div>
    )
}

export default Calendar
