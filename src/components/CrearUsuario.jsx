import React,{useRef,useState,useEffect} from 'react'
import Nav from "./Nav";
import { obtenerClases } from "../utils/functions";

const CrearUsuario = () => {
    useEffect(() => {
        obtenerClases(divCheckboxRef)
    }, [])
    const [error,setError] = useState("")
    
    function nuevoUsuario(e,usuario,nombre,apellido,email,telefono,direccion,password) {
        console.log(checkbox1Ref.current.checked);
        e.preventDefault()
        var data = {
            usuario,
            nombre,
            apellido,
            email,
            telefono,
            direccion,
            password,
            isAdmin:false,
            clases:[checkbox1Ref.current.name,checkbox2Ref.current.name,checkbox3Ref.current.name,checkbox4Ref.current.name]
        }
        fetch(`http://localhost:5000/usuarios`, {
            method: 'POST', 
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json()) 
        .then(res=>{
            if(res.Usuario){
                setError("")
                console.log("bien",res);
            }
            else{
                setError(res.error)
            }
        })
    }
    
    const usuarioRef = useRef(null)
    const nombreRef = useRef(null)
    const apellidoRef = useRef(null)
    const emailRef = useRef(null)
    const telefonoRef = useRef(null)
    const direccionRef = useRef(null)
    const passwordRef = useRef(null)
    const divCheckboxRef = useRef(null)
    const checkbox1Ref = useRef(null)
    const checkbox2Ref = useRef(null)
    const checkbox3Ref = useRef(null)
    const checkbox4Ref = useRef(null)
    return (
        <div className="containerInicio flex">
            <Nav/>
            <form   className="form-container-user" data-aos="zoom-in">
                <div><input   ref={usuarioRef} className="form-control" placeholder="USUARIO" type="text"/></div>
                <div><input   ref={nombreRef} className="form-control" placeholder="Nombre" type="text"/></div>
                <div><input   ref={apellidoRef} className="form-control" placeholder="Apellido" type="text"/></div>
                <div><input   ref={emailRef} className="form-control" placeholder="Email" type="email"/></div>
                <div><input   ref={telefonoRef} className="form-control" placeholder="Telefono" type="text"/></div>
                <div><input   ref={direccionRef} className="form-control" placeholder="Direccion" type="text"/></div>
                <div><input   ref={passwordRef} className="form-control" placeholder="PASSWORD" type="text"/></div>
                <div className="checkbox" ref={divCheckboxRef}>
                    {/* <input  ref={checkbox1Ref} type="checkbox" name="1"/><p>Musculacion</p>
                    <input  ref={checkbox2Ref} type="checkbox" name="2"/><p>Spinning</p>
                    <input  ref={checkbox3Ref} type="checkbox" name="3"/><p>Yoga</p>
                    <input  ref={checkbox4Ref} type="checkbox" name="4"/><p>Funcional</p>  */}
                </div>
                <p className="errorUser"> {
                    error ? error : ""
                }</p>
                <div><button className="btn btn-success btn-block" onClick={(e)=>{nuevoUsuario(e,usuarioRef.current.value,nombreRef.current.value,apellidoRef.current.value,emailRef.current.value,telefonoRef.current.value,direccionRef.current.value,passwordRef.current.value)}}>CREAR USUARIO</button></div>
            </form>
        </div>
    )
}

export default CrearUsuario
