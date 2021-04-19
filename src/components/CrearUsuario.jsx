import React, { useRef, useState, useEffect, useContext } from 'react'
import Nav from "./Nav";
import { obtenerClases,getData } from "../utils/functions";
import { useHistory } from "react-router-dom";
import { server } from "../utils/global";

const CrearUsuario = () => {

    useEffect(() => {
        obtenerClases(divCheckboxRef,arrayClasesUser)
    }, [])
    let history = useHistory();
    getData().then((res)=>{if(res.isAdmin ===false) history.push("/")})
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    let arrayClasesUser = []
    function nuevoUsuario(e, usuario, nombre, apellido, email, telefono, direccion, password) {
        e.preventDefault()
        var data = {
            usuario,
            nombre,
            apellido,
            email,
            telefono,
            direccion,
            password,
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
                    setSuccess(true)
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
    function successCreate() {
        if(success===true){
        alert("Usuario Creado con exito") 
        if(window.confirm) window.location.reload()
        }
    }
    successCreate()
    return (
        <div>
            <Nav />
            <div className="containerInicio flex" ref={containerRef}>
                <form className="form-container-user" data-aos="zoom-in">
                    <div><input ref={usuarioRef} className="form-control" placeholder="USUARIO" type="text" /></div>
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
                    <div><button className="btn btn-success btn-block" onClick={(e) => { nuevoUsuario(e, usuarioRef.current.value, nombreRef.current.value, apellidoRef.current.value, emailRef.current.value, telefonoRef.current.value, direccionRef.current.value, passwordRef.current.value) }}>CREAR USUARIO</button></div>
                </form>
            </div>
        </div>
    )
}

export default CrearUsuario
