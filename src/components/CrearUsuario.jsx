import React, { useRef, useState, useEffect} from 'react'
import Nav from "./Nav";
import WhatsApp from "./WhatsApp";
import { obtenerClases,getData } from "../utils/functions";
import { useHistory } from "react-router-dom";
import { server } from "../utils/global";
import swal from 'sweetalert'


const CrearUsuario = () => {

    useEffect(() => {
        obtenerClases(divCheckboxRef,arrayClasesUser)
    }, [])
    let history = useHistory();
    getData().then((res)=>{if(res.isAdmin ===false) history.push("/")})
    if(!arrayClasesUser) {
        var arrayClasesUser=[]
    }
    const [error, setError] = useState("")
    const [searchOn, setSearchOn] = useState(false)
    const [array, setarray] = useState([])
    function nuevoUsuario(e) {
        e.preventDefault()
        var data = {
            usuario:usuarioRef.current.value,
            nombre:nombreRef.current.value,
            apellido:apellidoRef.current.value,
            email:emailRef.current.value,
            telefono:telefonoRef.current.value,
            direccion:direccionRef.current.value,
            password:passwordRef.current.value,
            isAdmin: false,
            clases: arrayClasesUser
        }
        fetch(`${server}/usuarios`, {
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
    const containerRef = useRef(null)
    const usuarioRef = useRef(null)
    const nombreRef = useRef(null)
    const apellidoRef = useRef(null)
    const emailRef = useRef(null)
    const telefonoRef = useRef(null)
    const direccionRef = useRef(null)
    const passwordRef = useRef(null)
    const divCheckboxRef = useRef(null)

    async function obtenerUser(e,nameUser) {
        e.preventDefault()
        const user = await fetch(`${server}/usuarios/${nameUser}`)
            .then(response => response.json())
    
        const arrayNodes = [...divCheckboxRef.current.childNodes]
        arrayNodes.forEach(e => e.checked=false);
        setSearchOn(true)
        if(user.error) setError(true)
        else {
            usuarioRef.current.value = user.usuario 
            nombreRef.current.value = user.nombre 
            apellidoRef.current.value = user.apellido 
            emailRef.current.value = user.email
            telefonoRef.current.value = user.telefono
            direccionRef.current.value = user.direccion
            for (let i = 0; i < arrayNodes.length; i++) {
                const element = arrayNodes[i];
                const includes = user.clases.includes(element.id)
                if(includes===true) {
                    element.checked=true
                    arrayClasesUser.push(element.id)
                    setarray(arrayClasesUser)
                }
            }
        }
        
    }
    async function modifyUser(e) {
        const myArrClean = array.filter(Boolean)
        e.preventDefault()
        var data = {
            usuario:usuarioRef.current.value,
            nombre:nombreRef.current.value,
            apellido:apellidoRef.current.value,
            email:emailRef.current.value,
            telefono:telefonoRef.current.value,
            direccion:direccionRef.current.value,
            password:passwordRef.current.value,
            clases: myArrClean.toString()
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
    
    return (
        <div>
            <Nav />
            <div className="containerInicio flex" ref={containerRef}>
                <form className="form-container-user" data-aos="zoom-in">
                    <div><input ref={usuarioRef} className="form-control" placeholder="USUARIO" onChange={()=> setSearchOn(false)} type="text" /></div>
                    <div><input ref={nombreRef} className="form-control" placeholder="Nombre" type="text" /></div>
                    <div><input ref={apellidoRef} className="form-control" placeholder="Apellido" type="text" /></div>
                    <div><input ref={emailRef} className="form-control" placeholder="Email" type="email" /></div>
                    <div><input ref={telefonoRef} className="form-control" placeholder="Telefono" type="text" /></div>
                    <div><input ref={direccionRef} className="form-control" placeholder="Direccion" type="text" /></div>
                    <div><input ref={passwordRef} className="form-control" placeholder="PASSWORD" type="text" /></div>
                    <div className="checkbox" ref={divCheckboxRef}></div>
                    <p className="errorUser"> {
                        error ? error : ""
                    }
                    </p>
                    <div><button className="btn btn-success btn-block" onClick={(e) => nuevoUsuario(e)}>CREAR USUARIO</button></div>
                    <div>{searchOn===false ?
                        <button className="btn btn-secondary btn-block" onClick={(e)=>obtenerUser(e,usuarioRef.current.value)}>OBTENER USUARIO</button> :
                        <button className="btn btn-secondary btn-block" onClick={(e)=>modifyUser(e,arrayClasesUser)}>MODIFICAR USUARIO</button>
                    }
                    </div>
                </form>
            </div>
            <WhatsApp/>
        </div>
    )
}

export default CrearUsuario
