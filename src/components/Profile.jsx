import React,{useRef,useEffect,useState,useContext} from 'react'
import {getData} from '../utils/functions'
import Nav from "./Nav";
import Map from "./Map";
import WhatsApp from "./WhatsApp";
import {server,gymName} from "../utils/global";
import Footer from "./Footer";
import { UserContext } from './UserContext';


const Profile = () => {
    const dateRef = useRef()
    const fechaRef = useRef()
    const claseRef = useRef()
    const horarioRef = useRef()
    const profesorRef = useRef()
    const mapUrl = "https://maps.google.com/maps/api/js?v=3.exp&key=AIzaSyCDEKn4T7koVtwqglWk8DjQAIHUw3hsIBg"
    useEffect(() => {
        getData().then((res)=>{setAdmin(res)})
        setStateNav("profile")
    }, [])
    const {setStateNav} = useContext(UserContext)
    const [admin,setAdmin]  = useState()
    async function reservationList(id,date) {
        var data ={
            id,
            date
        }
        await fetch(`${server}/turnos/reservationProfile`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp=>resp.json())
        .then(data=>createReservation(data))
    }
    const dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]
    function createReservation(data) {
        
        fechaRef.current.innerHTML = ""
        claseRef.current.innerHTML = ""
        horarioRef.current.innerHTML = ""
        profesorRef.current.innerHTML = ""
        if(data.length!==0){
            let n = document.querySelectorAll(".title")
            let arrayNodes = [...n]
            arrayNodes.forEach(element => element.removeAttribute("hidden"))
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                let mes = element.date.slice(5,7)
                let dia = new Date (element.date).getDay()
                let p = document.createElement("p")
                let p1 = document.createElement("p")
                let p2 = document.createElement("p")
                let p3 = document.createElement("p")
                p.classList.add("parrafoList")
                p1.classList.add("parrafoList")
                p2.classList.add("parrafoList")
                p3.classList.add("parrafoList")
                p.innerHTML = `${dias[dia].slice(0,3)} ${element.date.slice(8)}`
                p1.innerHTML = element.clase.toUpperCase()
                p2.innerHTML = `${element.horario} hs`
                p3.innerHTML = element.teacher.toUpperCase()
                fechaRef.current.appendChild(p)
                claseRef.current.appendChild(p1)
                horarioRef.current.appendChild(p2)
                profesorRef.current.appendChild(p3)
            }
            
        }
        else {
            let n = document.querySelectorAll(".title")
            let arrayNodes = [...n]
            arrayNodes.forEach(element => element.setAttribute("hidden",""))
            let p =document.createElement("p")
            p.classList.add("parrafoList")
            p.innerText = "No hay nada para mostrar"
            claseRef.current.appendChild(p)
        }

    }
    return (
        <div>
            <div className="profile-container">
            <div className="divReservas">
                <h2>Tus reservas</h2>
                <div className="reservationList">
                    <input type="date" onChange={()=>reservationList(admin.id,dateRef.current.value)} ref={dateRef}/>
                    <div className="flex column" ><p className="title" hidden>Fecha</p><div ref={fechaRef} className="flex column"></div> </div>
                    <div className="flex column" ><p className="title" hidden>Clase</p><div ref={claseRef} className="flex column"></div></div>
                    <div className="flex column"><p className="title" hidden>Horario</p><div  ref={horarioRef} className="flex column"></div></div>
                    <div className="flex column"><p className="title" hidden>Profesor</p> <div  ref={profesorRef} className="flex column"></div> </div>
                </div>
            </div>
            <div className="map-container">
                <h2>Tu sede {gymName}</h2>
                <div className="mapProfile">
                    <Map googleMapURL = {mapUrl}
                    mapElement = {<div style={{height:"40vh",width:"80vw",margin:"auto"}}/>}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement = {<p>Cargando</p>}
                    />
                </div>
            </div>
            </div>
            <WhatsApp/>
            <Footer/>
        </div>
    )
}

export default Profile
