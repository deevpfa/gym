import React, { useRef, useState } from 'react'
import { userLoggin } from '../utils/functions'
import { useHistory } from "react-router-dom";


const Login = () => {
    const [validateUser, setValidateUser] = useState("")
    let history = useHistory();
    if (validateUser === true) history.push("/inicio")
    const usuarioRef = useRef(null)
    const passwordRef = useRef(null)
    return (
        <div className="m-auto divLogin">
            <form className="form-group form-container-login" data-aos="zoom-in">
                <input ref={usuarioRef} className="form-control" placeholder="USUARIO" type="text" />
                <input ref={passwordRef} className="form-control mt-3" placeholder="PASSWORD" type="password" />
                <p className="invalid">{
                    validateUser===false ? "Usuario o password incorrecto" : ""
                }</p>
                <input onClick={async() => {  setValidateUser(await userLoggin(usuarioRef.current.value, passwordRef.current.value)) }} className="btn btn-dark btn-block mt-3" value="INICIAR SESION" type="button" />
            </form>
        </div>
    )
}

export default Login
