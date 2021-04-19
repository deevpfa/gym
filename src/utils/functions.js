import { server, gymName } from "./global";

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
 * 
 * @param {contador} contadorMax 
 * @param {useState} numeroMes 
 */
export function contador(contadorMax, numeroMes) {
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
    return datos
}
function pad(number) {
    if (number < 10) {
        return '0' + (number + 1);
    }
    return number;
}


let arrayTurnos = []
var hoy = new Date()


/**
 * 
 * @param {clase por parametro} param1 
 * @param {numeroMes} param2 
 * @param {parametro de horarios} param3 
 * @param {parametro de horarios} param4 
 * @returns peticion a api para los horarios
 */
export function turnosCalendario(diaTurnosApi, param1, param2, param3, param4,admin) {
    var data = {
        claseId: param1,
        date: `${hoy.getFullYear()}-${pad(param2)}-${diaTurnosApi}`
    }
    fetch(`${server}/turnos/consulta`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            arrayTurnos = []
            data.forEach(element => { arrayTurnos.push(element) })
        })
        .then(() => horarios(param3, param4,admin))
}

async function deleteClass(id) {
    const response = fetch(`${server}/turnos/${id}`, {
        method: 'DELETE',
    })
    .then(res => res.json()) 
    window.location.reload()
}

/**
 * 
 * @param {referencia} horasRef 
 * @param {useState} setTurno 
 * @returns crear los horarios en el calendario
 */
export function horarios(horasRef, setTurno,admin) {
    horasRef.current.innerHTML = ""
    let adminState
    
    if(admin===true) adminState=1
    for (let i = 0; i < arrayTurnos.length; i++) {
        let element = arrayTurnos[i]
        let p = document.createElement("p")
        let p2 = document.createElement("p")
        let p3 = document.createElement("p")
        let div = document.createElement('div')
        let button = document.createElement("button")
        button.innerHTML = "BORRAR"
        button.classList.add("btn","btn-danger","btn-turnos")
        button.setAttribute("id" , element.id)
        div.classList.add("calendar__Item")
        p.classList.add("parrafoCalendar", "parrafoCalendar2")
        p2.classList.add("parrafoCalendar", "parrafoCalendar1")
        p3.classList.add("parrafoCalendar", "parrafoCalendar3")
        p.innerHTML = `Disponibles: ${element.disponibles}`
        p3.innerHTML = `${element.horarios}:00 `
        button.onclick= (e) => {e.stopPropagation(); deleteClass(e.target.id);}
        div.onclick = (e) => seleccionaTurno(e.target, horasRef, setTurno)
        div.appendChild(p3)
        div.appendChild(p)
        if (element.teacher) {
            p2.innerHTML = `${element.teacher}`
            div.appendChild(p2)
        }
        if(adminState===1) div.appendChild(button)
        horasRef.current.appendChild(div)
    }
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
        let p = document.createElement("p")
        div.classList.add("cuadro", "cuadro2")
        div.onclick = () => { history.push(`/calendar/${element.id}`) }
        p.innerHTML = element.clase.toUpperCase()
        img.classList.add("noImg")
        img.src = element.img
        div.appendChild(img)
        div.appendChild(p)
        ref.current.appendChild(div)
    }
}

export function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1);
}

let arrayClases = []
export async function obtenerClases(ref,arrayClasesUser) {
    await fetch(`${server}/clases`)
        .then(response => response.json())
        .then(data => {
            arrayClases = []
            data.forEach(element => arrayClases.push(element))
        })
        .then(() => crearCheckbox(ref,arrayClasesUser))
}

function crearCheckbox(ref,arrayClasesUser) {
    for (let i = 0; i < arrayClases.length; i++) {
        const element = arrayClases[i];
        let input = document.createElement("input")
        let p = document.createElement("p")
        input.setAttribute("type", "checkbox")
        input.setAttribute("id", i + 1)
        input.onclick = (e)=>{arrayClasesUser.push(e.target.id)}
        p.innerHTML = capitalize(element.clase)
        ref.current.appendChild(input)
        ref.current.appendChild(p)
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
                <p>{hook.lastChild.textContent}</p>
            </div>
            <div className="buttonsConfirmTurno">
                <button className="btn btn-secondary" onClick={() => { setHook(""); document.body.style.overflow = ""; ref.current.style.opacity = "1" }}>CERRAR</button>
                <button className="btn btn-success">RESERVAR</button>
            </div>
        </div>
    </div>

}

export function setDays(expiration) {
    let newDate = new Date(expiration)
    return ((newDate.getTime() - hoy.getTime()) / 86400000).toString().split('.')[0]
}
