import { host,server } from "./global";

/**
 * 
 * @param {nombreUsuario} usuario 
 * @param {passwordUsuario} password 
 * @returns setea el token en localstorage y devuelve true = admin o false != admin
 */
export const userLoggin = async(usuario,password)=>{
    var respuestaFetch;
    var data = {
        usuario,
        password
    }
    await fetch(`${server}/usuarios/login`, {
        method: 'POST', 
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json()) 
    .then(res=>{ 
                if(res.exito){
                    localStorage.setItem("nombre",`${res.exito.user.nombre} ${res.exito.user.apellido}`)
                    localStorage.setItem("token",res.exito.token)
                    respuestaFetch=true
                }
                else{
                    respuestaFetch=false
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
        body: JSON.stringify({token: localStorage.getItem("token")}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    return valor
}

/**
 * 
 * @param {contador} contadorMax 
 * @param {useState} numeroMes 
 */
export function contador(contadorMax,numeroMes) {
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
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json()) 
    return datos
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
export function turnosCalendario(diaTurnosApi,param1,param2,param3,param4) {
    var data = {
        claseId:param1,
        date: `${diaTurnosApi}-${param2 + 1}-${hoy.getFullYear()}`
    }
    fetch(`${server}/turnos/consulta`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => { arrayTurnos=[]
            data.forEach(element => { arrayTurnos.push(element) })
        })
        .then(() => horarios(param3,param4))
}

/**
 * 
 * @param {referencia} horasRef 
 * @param {useState} setTurno 
 * @returns crear los horarios en el calendario
 */
export function horarios(horasRef,setTurno) {
    horasRef.current.innerHTML = ""
    for (let i = 0; i < arrayTurnos.length; i++) {
        let element = arrayTurnos[i]
        let p = document.createElement("p")
        let p2 = document.createElement("p")
        let p3 = document.createElement("p")
        let div = document.createElement('div')
        div.classList.add("calendar__Item")
        p.classList.add("parrafoCalendar", "parrafoCalendar2")
        p2.classList.add("parrafoCalendar")
        p3.classList.add("parrafoCalendar", "parrafoCalendar3")
        p.innerHTML = `Disponibles: ${element.disponibles}`
        if(element.teacher===null) element.teacher = "" 
        p2.innerHTML = `${element.teacher}`
        p3.innerHTML = `${element.horarios}:00 `
        div.onclick = (e) => seleccionaTurno(e.target,horasRef,setTurno)
        div.appendChild(p3)
        div.appendChild(p)
        div.appendChild(p2)
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
export function seleccionaTurno(e,horasRef,setTurno) {
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

export function crearClases(ref,arrayClases) {
    ref.current.innerHTML = ""
    for (let i = 0; i < arrayClases.length; i++) {
        const element = arrayClases[i];
        let div = document.createElement("div")
        let img = document.createElement("img")
        let p = document.createElement("p")
        div.classList.add("cuadro","cuadro2")
        div.setAttribute("data-aos","fade-down")
        div.onclick = ()=>{window.location = `${host}/calendar/${element.id}`}
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
export async function obtenerClases(ref) {
    await fetch(`http://localhost:5000/clases`)
    .then(response => response.json()) 
    .then(data => { arrayClases=[]
        data.forEach(element => arrayClases.push(element))
    })
    .then(()=> crearCheckbox(ref))
}

function crearCheckbox(ref) {
    console.log(arrayClases);
    for (let i = 0; i < arrayClases.length; i++) {
        const element = arrayClases[i];
        let input = document.createElement("input")
        let p = document.createElement("p")
        input.setAttribute("ref", `checkbox${(i+1)}Ref`)
        input.setAttribute("type", "checkbox")
        input.setAttribute("name", i+1)
        p.innerHTML= capitalize(element.clase)
        ref.current.appendChild(input)
        ref.current.appendChild(p)
    }
}
