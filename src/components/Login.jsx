import React, { useRef, useState,useEffect } from 'react'
import { userLoggin } from '../utils/functions'
import { useHistory } from "react-router-dom";
import logo from "../assets/logo.png";
import loadingGif from "../assets/loadingGif.gif";
import Background from "./Background";


const Login = () => {
    useEffect(() => {
        <Background/>
    }, [])
    const [validateUser, setValidateUser] = useState("")
    let history = useHistory();
    if (validateUser === true) history.push("/inicio")
    const usuarioRef = useRef(null)
    const passwordRef = useRef(null)
    const gif = useRef(null)
    const iniciarSesion = useRef(null)
    return (
        <div className="m-auto divLogin">
            <div className="logoLogin" >
                <img src={logo} alt="" />
            </div>

            <form className="form-group form-container-login" data-aos="zoom-in">
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">@</span>
                </div>
                <input type="text" className="form-control" ref={usuarioRef} placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
            </div>
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">&#128274;</span>
                </div>
                <input type="password" className="form-control" ref={passwordRef} placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" />
            </div>
                <p className="invalid">{
                    validateUser===false ? "Usuario o password incorrecto" : ""
                }</p>
            <div className="lastDivLogin">
                <input  ref={iniciarSesion} onClick={async(e) => {  gif.current.removeAttribute("hidden") ;setValidateUser(await userLoggin(usuarioRef.current.value, passwordRef.current.value,gif)) }} className="btn btn-dark btn-block" value="INICIAR SESION" type="button" />
                <img src={loadingGif} ref={gif} hidden className="loadingGif" alt="" />
            </div>
            </form>
        </div>
    )
}

export default Login
