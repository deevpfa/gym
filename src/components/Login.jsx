import React, { useRef, useState,useEffect } from 'react'
import { userLoggin } from '../utils/functions'
import { useHistory } from "react-router-dom";
import logo from "../assets/logo3.png";
import fondoIMG from "../assets/imgE-Gym.jpg";
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
    return (
        <div className="m-auto divLogin">
            <div className="logoLogin" >
                <img src={logo} alt="" />
            </div>

            <form className="form-group form-container-login" data-aos="zoom-in">
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">@</span>
                </div>
                <input type="text" class="form-control" ref={usuarioRef} placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
            </div>
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text" ref={passwordRef} id="basic-addon1">&#128274;</span>
                </div>
                <input type="password" class="form-control" ref={passwordRef} placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" />
            </div>
                <p className="invalid">{
                    validateUser===false ? "Usuario o password incorrecto" : ""
                }</p>
                <input onClick={async() => {  setValidateUser(await userLoggin(usuarioRef.current.value, passwordRef.current.value)) }} className="btn btn-dark btn-block mt-3" value="INICIAR SESION" type="button" />
            </form>
        </div>
    )
}

export default Login
