import React, { useRef, useState, useEffect} from 'react'
import WhatsApp from "./WhatsApp";
import { obtenerClases,getData } from "../utils/functions";
import { useHistory } from "react-router-dom";
import { server } from "../utils/global";
import swal from 'sweetalert'
import iconClose from "../assets/iconClose.svg";
import addUser from "../assets/addUser.svg";
import back from "../assets/back.svg";
import moment from "moment";


const Users = () => {

    useEffect(() => {
        obtenerUsuarios()
    }, [])
    let history = useHistory();
    getData().then((res)=>{if(res.isAdmin ===false) history.push("/")})
    if(!arrayClasesUser)  var arrayClasesUser=[]
    
    const [error, setError] = useState("")
    const [cantidadUser, setCantidadUser] = useState("")
    const [searchOn, setSearchOn] = useState()
    const [user, setUser] = useState({user:""})
    const [array, setarray] = useState([])
    const [modify, setModify] = useState(false)
    const [listDatos,setListDatos] = useState(false)
    const containerRef = useRef(null)
    const usuarioRef = useRef(null)
    const usuarioChangeRef = useRef(null)
    const nombreRef = useRef(null)
    const nombreChangeRef = useRef(null)
    const apellidoChangeRef = useRef(null)
    const emailRef = useRef(null)
    const telefonoRef = useRef(null)
    const direccionRef = useRef(null)
    const passwordRef = useRef(null)
    const dateRef = useRef(null)
    const vencRef = useRef(null)
    const plusRef = useRef(null)
    const MoreRef = useRef(null)
    const divCheckboxRef = useRef(null)
    const loaderRef = useRef(null)
    async function nuevoUsuario(e) {
        e.preventDefault()
        setSearchOn(false)
        var data = {
            usuario:usuarioChangeRef.current.value,
            nombre:nombreChangeRef.current.value,
            apellido:apellidoChangeRef.current.value,
            email:emailRef.current.value,
            telefono:telefonoRef.current.value,
            direccion:direccionRef.current.value,
            password:passwordRef.current.value,
            isAdmin: false,
            clases: array,
            expirationDay:dateRef.current.value
        }
        await fetch(`${server}/usuarios`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(res => {
                if (res.Usuario) {
                    swal({
                        title:"Usuario creado con exito",
                        icon:"success",
                        buttons:"Ok"
                    }).then(resp=> resp ? window.location.reload() : "") 
                }
                else {
                    setError(res.error)
                }
            })
    }

    async function obtenerUser(e) {
        e.preventDefault()
        setModify(true)
        setListDatos(false)
        await obtenerClases(divCheckboxRef,arrayClasesUser,setarray)
        const arrayNodes = [...divCheckboxRef.current.childNodes]
        arrayNodes.forEach(e => e.checked=false);
            usuarioChangeRef.current.value = user.user.usuario 
            nombreChangeRef.current.value = user.user.nombre 
            apellidoChangeRef.current.value = user.user.apellido 
            emailRef.current.value = user.user.email
            telefonoRef.current.value = user.user.telefono
            direccionRef.current.value = user.user.direccion
            dateRef.current.value = user.user.expiration
            if(user.user.clases){
            for (let i = 0; i < arrayNodes.length; i++) {
                const element = arrayNodes[i];
                const includes = user.user.clases.some(e => e.clase == (element.firstChild.id))
                if(includes===true) {
                    element.firstChild.checked=true
                    const f = user.user.clases.find(e => e.clase == element.firstChild.id)
                    element.childNodes[2].value = f.semanal
                    arrayClasesUser.push({clase:element.firstChild.id,semanal:element.lastChild.value})
                    setarray(arrayClasesUser)
                }
            }
            }
        
        
    }
    async function modifyUser(e) {
        const myArrClean = array.filter(Boolean)
        e.preventDefault()
        var data = {
            usuario:usuarioChangeRef.current.value,
            nombre:nombreChangeRef.current.value,
            apellido:apellidoChangeRef.current.value,
            email:emailRef.current.value,
            telefono:telefonoRef.current.value,
            direccion:direccionRef.current.value,
            password:passwordRef.current.value,
            clases: JSON.stringify(myArrClean) ,
            expiration:dateRef.current.value
        }
        await fetch(`${server}/usuarios/miUsuario`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(res =>{ if (res.exito) {
                swal({
                    title:"Usuario actualizado con exito",
                    icon:"success",
                    buttons:"Ok"
                }).then(resp=> resp ? window.location.reload() : "") 
            }
            else {
                swal({
                    title:"No se pudo actualizar el usuario, vuelve a intentarlo...",
                    icon:"error",
                    buttons:"Ok"
                }).then(resp=> resp ? window.location.reload() : "")
            }
        })
    }
  
    function obtenerUsuarios() {
        var data ={
            token:localStorage.getItem("token")
        }
        fetch(`${server}/usuarios/findUSERS`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(res => crearUSERS(res))
    }
    function crearUSERS(res) {
        usuarioRef.current.innerHTML=""
        nombreRef.current.innerHTML=""
        vencRef.current.innerHTML=""
        plusRef.current.innerHTML=""
        setCantidadUser(res.length)
        for (let i = 0; i < res.length; i++) {
            const element = res[i];
            let p1 = document.createElement("p")
            let p2 = document.createElement("p")
            let p3 = document.createElement("p")
            let p4 = document.createElement("p")
            let p5 = document.createElement("p")
            p1.innerHTML = element.usuario
            p2.innerHTML = `${element.apellido} ${element.nombre}`
            p4.innerHTML = moment(element.expiration).format('DD-MM-YYYY')
            p5.innerHTML = "+ Ver"
            p5.onclick = () => moreData(element.usuario);
            p5.classList.add("moreReservation")
            usuarioRef.current.appendChild(p1)
            nombreRef.current.appendChild(p2)
            vencRef.current.appendChild(p4)
            plusRef.current.appendChild(p5)
        }
    }

    function searchUSERS(e) {
        var data ={
            filtro:searchOn,
            value:e.target.value
        }
        fetch(`${server}/usuarios/findSearchUSERS`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(resp => crearUSERS(resp))

    }

    async function moreData(usuario) {
        setListDatos(true)
        loaderRef.current.removeAttribute("hidden")
        await fetch(`${server}/usuarios/${usuario}`)
            .then(response => response.json())
            .then(resp => crearMoreDataUSER(resp))
    }
    function crearMoreDataUSER(datos) {
        setUser(datos)
        MoreRef.current.innerHTML = ""
        let p1 = document.createElement("p")
        let p2 = document.createElement("p")
        let p3 = document.createElement("p")
        let p4 = document.createElement("p")
        let p5 = document.createElement("p")
        let p6 = document.createElement("p")
        let p7 = document.createElement("p")
        p1.innerHTML = `Nombre : ${datos.user.nombre} ${datos.user.apellido}`
        p2.innerHTML = `Email : ${datos.user.email}`
        p3.innerHTML = `Telefono : ${datos.user.telefono}`
        p4.innerHTML = `Direccion : ${datos.user.direccion}`
        p5.innerHTML = `Clases : ${datos.clases.toString()}`
        p6.innerHTML = `Alta : ${moment(datos.user.createdAt).format('DD-MM-YYYY').substring(0,10)}`
        p7.innerHTML = `Venc : ${moment(datos.user.expiration).format('DD-MM-YYYY')}`
        MoreRef.current.appendChild(p1)
        MoreRef.current.appendChild(p2)
        MoreRef.current.appendChild(p3)
        MoreRef.current.appendChild(p4)
        MoreRef.current.appendChild(p5)
        MoreRef.current.appendChild(p7)
        MoreRef.current.appendChild(p6)
        loaderRef.current.setAttribute("hidden","")
    }
    return (
        <div>
            {
                modify===false ? 
            
            <div className="container-newUser">
                <div className="searchUser">
                    <div className="nuevoUSER" onClick={()=> {setModify(true) ;setSearchOn(false);obtenerClases(divCheckboxRef,arrayClasesUser,setarray)}}> <img src={addUser} alt=""/> Nuevo Usuario</div>
                    <p>Buscar por : </p>
                    <select className="selectNewUser" onChange={(e)=> setSearchOn(e.target.value)}  name="" id="">
                        <option value=""></option>
                        <option value="usuario">USUARIO</option>
                        <option value="apellido" >APELLIDO</option>
                        <option value="expiration">VENCIMIENTO</option>
                    </select>
                    <div className="searchOn">
                    {
                        searchOn==="usuario" || searchOn==="apellido"  ? <div className="input-group rounded inputText">
                        <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search"
                          aria-describedby="search-addon" onChange={(e)=> searchUSERS(e)} />
                      </div> : ""
                    }
                    {
                        searchOn==="expiration" ? <input type="date" name="" onChange={(e)=> searchUSERS(e)} id=""/>  : ""
                    }
                    </div>
                </div>
                <div className="div-newUser">
                    <div>
                    <p>Usuarios ({cantidadUser})</p>
                    <div ref={usuarioRef}></div>
                    </div>
                    <div>
                    <p>Nombre</p>
                    <div ref={nombreRef}></div>
                    </div>
                    <div>
                    <p>Vencimiento</p>
                    <div ref={vencRef}></div>
                    </div>
                    <div>
                    <p></p>
                    <div ref={plusRef}></div>
                    </div>
                </div>
            </div>
            :""}
            {listDatos===true ?
            <div className="divMoreVR" data-aos="flip-up">
                    <div>
                        <div className="loading-div-user" ref={loaderRef} hidden >
                            <div className="loading loading--full-height"></div>
                        </div>
                        <img src={iconClose} onClick={()=>setListDatos(false)} alt=""/ >
                        <p>{user.user.usuario}</p>
                        <div ref={MoreRef} className="listNames" >
                        </div>
                        <h6 onClick={(e)=> obtenerUser(e,user.usuario)}>Modificar Usuario</h6>
                    </div>
            </div>
            :""}
            {
                modify===true ?
            
            <div className="containerInicio flex" ref={containerRef}>
                <div className="backArrow" onClick={()=> {setModify(false);setSearchOn("");obtenerUsuarios()}}> <img src={back} alt=""/><p>Volver</p></div>
                <form className="form-container-user" data-aos="zoom-in">
                    <div><input ref={usuarioChangeRef} className="form-control" placeholder="USUARIO"  type="text" /></div>
                    <div><input ref={nombreChangeRef} className="form-control" placeholder="Nombre" type="text" /></div>
                    <div><input ref={apellidoChangeRef} className="form-control" placeholder="Apellido" type="text" /></div>
                    <div><input ref={emailRef} className="form-control" placeholder="Email" type="email" /></div>
                    <div><input ref={telefonoRef} className="form-control" placeholder="Telefono" type="text" /></div>
                    <div><input ref={direccionRef} className="form-control" placeholder="Direccion" type="text" /></div>
                    <div><input ref={passwordRef} className="form-control" placeholder="PASSWORD" type="text" /></div>
                    <div><input ref={dateRef }className="form-control" placeholder="Vencimiento" type="text" min={moment().format('YYYY-MM-DD')} onClick={(e)=> e.target.type="date"}/></div>
                    <div className="checkbox" ref={divCheckboxRef}></div>
                    
                    <p className="errorUser"> {
                        error ? error : ""
                    }
                    </p>
                    <div>{searchOn===false ?
                        <button className="btn btn-success btn-block" onClick={(e) => nuevoUsuario(e)}>CREAR USUARIO</button> :
                        <button className="btn btn-secondary btn-block" onClick={(e)=>modifyUser(e)}>MODIFICAR USUARIO</button>
                    }
                    </div>
                </form>
            </div>
            :""}
            <WhatsApp/>
        </div>
    )
}

export default Users
