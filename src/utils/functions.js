import { server, gymName } from "./global";
import swal from 'sweetalert'

/**
 * 
 * @param {nombreUsuario} usuario 
 * @param {passwordUsuario} password 
 * @returns setea el token en localstorage y devuelve true = admin o false != admin
 */
export const userLoggin = async (usuario, password) => {
    var respuestaFetch;
    var data = {
        usuario,
        password
    }
    await fetch(`${server}/usuarios/login`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(res => {
            if (res.exito) {
                localStorage.setItem("nombre", `${res.exito.user.nombre} ${res.exito.user.apellido}`)
                localStorage.setItem("token", res.exito.token)
                respuestaFetch = true
            }
            else {
                respuestaFetch = false
            }
        })
    return respuestaFetch
}
/**
 * return true o false dependiendo si es admin o no con el token
 */
export const ValidateUser = async () => {
    const valor = fetch(`${server}/usuarios/validacion`, {
        method: 'POST',
        body: JSON.stringify({ token: localStorage.getItem("token") }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
    return valor
}

export async function getData() {
    const userData = await ValidateUser()
    return userData
}



/**
 * setea las clases segun las tenga pagadas o no
 * @param {nombreUsuario} usuario 
 * @param {setea} setMusculacion 
 * @param {setea} setSpinning 
 * @param {setea} setYoga 
 * @param {setea} setFuncional 
 */
export function datosClases(usuario) {
    var data = {
        usuario
    }
    const datos = fetch(`${server}/usuarios/clases`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .catch(err => console.log(err))
    return datos
}

async function deleteTurno(id) {
    await fetch(`${server}/turnos/${id}`, {
        method: 'DELETE',
    })
    .then(res => res.json()) 
    window.location.reload()
}

async function deleteReservation(id) {
    await fetch(`${server}/turnos/reservation/${id}`, {
        method: 'DELETE',
    })
    .then(res => res.json()) 
    window.location.reload()
}



function pad(number,add) {
    if (number < 10) {
        return '0' + (number + add);
    }
    return number;
}



let arrayTurnos = []
var hoy = new Date()
let reservation
let semanal

/**
 * 
 * @param {clase por parametro} param1 
 * @param {numeroMes} param2 
 * @param {parametro de horarios} param3 
 * @param {parametro de horarios} param4 
 * @returns peticion a api para los horarios
 */
export async function turnosCalendario(diaTurnosApi, param1, param2, param3, param4,admin,loaderRef,setSemanal) {
    
    var data = {
        token:localStorage.getItem("token"),
        claseId: param1,
        date: `${hoy.getFullYear()}-${pad(param2,1)}-${pad(diaTurnosApi,0)}`
    }
    await fetch(`${server}/turnos/consulta`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
    
            if(!data || data===undefined) return
            else{
            arrayTurnos = []
            data.turno.forEach(e => { arrayTurnos.push(e) })
            reservation=false
            semanal = data.semanal
            setSemanal(data.semanal)
            data.turno.forEach(e => e.id === data.reservacion ? reservation = data.reservacion : "")
        }
        })
        .then(() => {
            horarios(param3, param4,admin,loaderRef)
        })
}



/**
 * 
 * @param {referencia} horasRef 
 * @param {useState} setTurno 
 * @returns crear los horarios en el calendario
 */
export function horarios(horasRef, setTurno,admin,loaderRef) {
    let adminState
    if(admin===true) adminState=1
    for (let i = 0; i < arrayTurnos.length; i++) {
        let element = arrayTurnos[i]
        let p = document.createElement("p")
        let p2 = document.createElement("p")
        let p3 = document.createElement("p")
        let div = document.createElement('div')
        div.classList.add("calendar__Item")
        div.setAttribute("id",element.id)
        p.classList.add("parrafoCalendar", "parrafoCalendar2")
        p2.classList.add("parrafoCalendar", "parrafoCalendar1")
        p3.classList.add("parrafoCalendar", "parrafoCalendar3")
        if(element.disponibles<=0 || reservation!==false  || semanal<=0){
            div.style.cursor = "not-allowed"
            div.style.opacity = "0.2"
        }
        else{
            div.onclick = (e) => seleccionaTurno(e.target, horasRef, setTurno)
        }
        p.innerHTML = `Disponibles: ${element.disponibles}`
        p3.innerHTML = `${element.horarios}:00 `
        div.appendChild(p3)
        div.appendChild(p)
        if (element.teacher) {
            p2.innerHTML = capitalize(`${element.teacher}`);
            div.appendChild(p2)
        }
        if(adminState===1){
            let button = document.createElement("button")
            button.innerHTML = "BORRAR"
            button.classList.add("btn","btn-danger","btn-turnos")
            button.setAttribute("id" , element.id)
            button.onclick= (e) => {e.stopPropagation(); swal({
                title: "Estas seguro que deseas eliminar este turno?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                  deleteTurno(e.target.id)
                }
              });}
            div.appendChild(button)
        }
        if(reservation!==false) {
            div.style.cursor = "not-allowed"
            div.style.opacity = "0.2"
            if(reservation===element.id){
                div.style.cursor = "pointer"
                div.style.opacity = "1"
                let button = document.createElement("button")
                button.innerHTML = "CANCELAR"
                button.classList.add("btn","btn-danger","btn-turnos")
                button.setAttribute("id" , element.id)
                button.onclick= (e) => {e.stopPropagation(); swal({
                    title: "Estas seguro que deseas cancelar esta reserva?",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  })
                  .then((willDelete) => {
                    if (willDelete) {
                      deleteReservation(e.target.id)
                    }
                  });}
                div.appendChild(button)
            }
        }
        horasRef.current.appendChild(div)
    }
    loaderRef.current.setAttribute("hidden","")
}

/**
 * 
 * @param {target} e 
 * @param {referencia} horasRef 
 * @param {useState} setTurno 
 * @returns setea los hover de los horarios
 */
export function seleccionaTurno(e, horasRef, setTurno) {
    let arrayChilds = horasRef.current.childNodes
    arrayChilds.forEach(element => {
        element.style.background = 'transparent'
    });
    if (e.localName === "p") {
        e.parentNode.style.background = 'rgb(94, 93, 93)'
        setTurno(e.parentNode)
        return
    }
    e.style.background = 'rgb(94, 93, 93)'
    setTurno(e)
}

export function crearClases(ref, arrayClases,history) {
    ref.current.innerHTML = ""
    for (let i = 0; i < arrayClases.length; i++) {
        const element = arrayClases[i];
        let div = document.createElement("div")
        let img = document.createElement("img")
        let span = document.createElement("span")
        let p = document.createElement("p")
        span.classList.add("spanCuadro")
        div.classList.add("cuadro", "cuadro2")
        div.onclick = () => { history.push(`/calendar/${element.id}`) }
        p.innerHTML = element.clase.toUpperCase()
        img.classList.add("noImg")
        img.src = element.img
        div.appendChild(img)    
        div.appendChild(span)
        div.appendChild(p)
        ref.current.appendChild(div)
    }
}

export function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1);
}

let arrayClases 
export async function obtenerClases(ref1,arrayClasesUser,setarray) {
    await fetch(`${server}/clases`)
        .then(response => response.json())
        .then(data => {
            arrayClases = []
            data.forEach(e => arrayClases.push(e))
        })
        .then(() => crearCheckbox(ref1,arrayClasesUser,setarray))
}

function crearCheckbox(ref1,arrayClasesUser,setarray) {
    for (let i = 0; i < arrayClases.length; i++) {
        const element = arrayClases[i];
        let input = document.createElement("input")
        let div = document.createElement("div")
        let input2 = document.createElement("input")
        let p = document.createElement("p")
        let p2 = document.createElement("p")
        input.setAttribute("type", "checkbox")
        input2.setAttribute("type", "number")
        input2.setAttribute("max", "6")
        input2.setAttribute("min", "0")
        input.setAttribute("id", element.id)
        input2.setAttribute("id", element.id)
        p2.innerHTML = "/sem"
        let obj = {
            clase:element.id,
            semanal:input2.value
        }   
        input2.onchange = () => {obj.semanal = input2.value}
        input.onclick = (e)=>{ 
            if(arrayClasesUser.some(element => element.clase == `${e.target.id}`)===false){
                arrayClasesUser.push(obj) 
            }
            else {
                const f = arrayClasesUser.find(element => element.clase==`${e.target.id}` )
                arrayClasesUser.splice(arrayClasesUser.indexOf(f),1)
            }
            setarray(arrayClasesUser)
        }
        p.innerHTML = capitalize(element.clase)
        div.appendChild(input)
        div.appendChild(p)
        div.appendChild(input2)
        div.appendChild(p2)
        ref1.current.appendChild(div)
        
    }
}



export function bookShift(hook, setHook, ref, nombreClase) {
    ref.current.style.opacity = "0.6"
    document.body.style.overflow = "hidden"
    return <div className="confirmTurnoContainer" id="containerTurno" data-aos="flip-down">
        <div className="confirmTurno">
            <p>¿Deseas Reservar el siguiente turno?</p>
            <div className="datosTurno">
                <p>{gymName}</p>
                <p> {capitalize(nombreClase)}</p>
                <p>{hook.firstChild.textContent}hs</p>
                <p>{hook.childNodes[2].textContent}</p>
            </div>
            <div className="buttonsConfirmTurno">
                <button className="btn btn-secondary" onClick={() => { setHook(""); document.body.style.overflow = ""; ref.current.style.opacity = "1" }}>CERRAR</button>
                <button className="btn btn-success" onClick={()=>bookConfirm(hook.id,localStorage.getItem("token"))}>RESERVAR</button>
            </div>
        </div>
    </div>

}

async function bookConfirm(idTurno,token) {
    var data = {
        idTurno,
        token
    }
    await fetch(`${server}/turnos/bookConfirm`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => data.success ? window.location.reload() : "")
}

export function setDays(expiration) {
    let newDate = new Date(expiration)
    return ((newDate.getTime() - hoy.getTime()) / 86400000).toString().split('.')[0]
}

export async function allClases(ref1,ref2) {
    await fetch(`${server}/clases`)
    .then(data => data.json())
    .then(data=> createAllClases(data,ref1,ref2))
}
function createAllClases(array,ref1,ref2) {
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        let p = document.createElement("p")
        let p2 = document.createElement("p")
        p.innerHTML = element.id
        p2.innerHTML = element.clase
        ref1.current.appendChild(p)
        ref2.current.appendChild(p2)
    }
}


