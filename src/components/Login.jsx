import React,{useRef,useState} from 'react'
import {userLoggin} from '../utils/functions'
import { useHistory } from "react-router-dom";
const Inicio = () => {
    const [invalid,setInvalid] = useState("")
    async function login() {
       setInvalid(await userLoggin(usuarioRef.current.value,passwordRef.current.value))
    }
    let history = useHistory();
    if(invalid===false) history.push("/inicio")
    const usuarioRef = useRef(null)
    const passwordRef = useRef(null)
    return (
        <div  className="m-auto divLogin">
            <form   className="form-group form-container-login" data-aos="zoom-in">
                <input   ref={usuarioRef} className="form-control" placeholder="USUARIO" type="text"/>
                <input   ref={passwordRef} className="form-control mt-3" placeholder="PASSWORD" type="password"/>
                <p className="invalid">{
                    invalid ? "Usuario o password incorrecto" : ""
                }</p>
                <input    onClick={()=>{login()}} className="btn btn-dark btn-block mt-3" value="INICIAR SESION" type="button"/>
            </form>
        </div>
    )
}

export default Inicio
