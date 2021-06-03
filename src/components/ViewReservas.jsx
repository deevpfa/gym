import React,{useRef,useEffect} from 'react'
import {server} from "../utils/global";
import iconClose from "../assets/iconClose.svg";

const ViewReservas = () => {
    useEffect(() => {
        obtenerClases()
    }, [])
    const dateRef = useRef()
    const selectRef = useRef()
    const fechaRef = useRef()
    const claseRef = useRef()
    const horarioRef = useRef()
    const profesorRef = useRef()
    const disponiblesRef = useRef()
    const viewClientsRef = useRef()
    const listNamesRef = useRef()
    const divListNamesRef = useRef()
    let arrayClases 
    async function obtenerClases() {
        await fetch(`${server}/clases`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            arrayClases = []
            data.forEach(e => arrayClases.push(e))
        })
        .then(() => addClases(arrayClases))
    }
    

    function addClases(array) {
        let option = document.createElement("option")
            option.value = ""
            option.innerHTML = "Seleccione una clase"
            selectRef.current.appendChild(option)
        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            let option = document.createElement("option")
            option.value = element.id
            option.innerHTML = element.clase.toUpperCase()
            selectRef.current.appendChild(option)
        }
    }

    async function addReservation(claseId,date) {
        var data = {
            claseId,
            date
        }
        await fetch(`${server}/turnos/reservationVR`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => crearDivReservation(data))
    }
    const dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]
    function crearDivReservation(data) {
        fechaRef.current.innerHTML = ""
        claseRef.current.innerHTML = ""
        horarioRef.current.innerHTML = ""
        profesorRef.current.innerHTML = ""
        disponiblesRef.current.innerHTML = ""
        viewClientsRef.current.innerHTML = ""
        if(data.length!==0){
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            let dia = new Date (element.date).getDay()
            let p = document.createElement("p")
            let p1 = document.createElement("p")
            let p2 = document.createElement("p")
            let p3 = document.createElement("p")
            let p4 = document.createElement("p")
            let p5 = document.createElement("p")
            p.classList.add("parrafoList")
            p1.classList.add("parrafoList")
            p2.classList.add("parrafoList")
            p3.classList.add("parrafoList")
            p4.classList.add("parrafoList")
            p5.classList.add("parrafoList","moreReservation")
            p.innerHTML = `${dias[dia].slice(0,3)} ${element.date.slice(8)}`
            p1.innerHTML = element.Clase.clase.toUpperCase()
            p2.innerHTML = `${element.horarios}hs`
            p3.innerHTML = element.teacher.toUpperCase()
            p4.innerHTML = element.disponibles
            p5.innerHTML = "+ Ver"
            p5.onclick = ()=> moreReservation(element.id);
            fechaRef.current.appendChild(p)
            claseRef.current.appendChild(p1)
            horarioRef.current.appendChild(p2)
            profesorRef.current.appendChild(p3)
            disponiblesRef.current.appendChild(p4)
            viewClientsRef.current.appendChild(p5)
        }
        }
        else {
            let p =document.createElement("p")
            p.classList.add("parrafoList")
            p.innerText = "No hay nada para mostrar"
            horarioRef.current.appendChild(p)
        }
    }
    async function moreReservation(id) {
        await fetch(`${server}/turnos/reservationListNames/${id}`)
            .then(response => response.json())
            .then(data => addListNames(data))
    }
    function addListNames(array) {
        listNamesRef.current.innerHTML = ""
        document.body.style.overflow = "hidden"
        divListNamesRef.current.removeAttribute("hidden");
        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            let p = document.createElement("p")
            p.innerText = `${element.Usuario.nombre} ${element.Usuario.apellido}`
            listNamesRef.current.appendChild(p)
        }
    }
    return (
        <div>
            <div className="reservation-container">
                
                <div className="dateVR"><input  ref={dateRef}  type="date" name="" id=""/></div>
                <div className="spaceDiv"></div>
                
                <div className="selectVR">
                <select  ref={selectRef} name="Clases" id="">
                </select>
                </div>
            
            </div>
                <div className="buttonVR">
                    <button onClick={()=>addReservation(selectRef.current.value,dateRef.current.value)}  className="btn btn-success">Buscar Reservas</button>
                </div>
                <div className="listVR">
                    <div className="flex column" ><p>Fecha</p><div ref={fechaRef}></div></div>
                    <div className="flex column" ><p>Clase</p><div ref={claseRef}></div></div>
                    <div className="flex column dispVR" ><p>Horario</p><div ref={horarioRef}></div></div>
                    <div className="flex column" ><p>Profesor</p><div ref={profesorRef}></div></div>
                    <div className="flex column dispVR"  ><p>Disp</p><div ref={disponiblesRef}></div></div>
                    <div className="flex column" ><hr className="hr"/> <div ref={viewClientsRef}></div></div>
                </div>
                <div className="divMoreVR" hidden ref={divListNamesRef}>
                    <div>
                        <img src={iconClose} onClick={()=>{divListNamesRef.current.setAttribute("hidden","");document.body.style.overflow = "unset"}} alt=""/ >
                        <p>Personas en el turno</p>
                        <div ref={listNamesRef} className="listNames" >
                        </div>
                    </div>
                 </div>
        </div>
    )
}

export default ViewReservas
