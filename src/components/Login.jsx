import React,{useRef,useState} from 'react'
import { useHistory } from "react-router-dom";
const Inicio = () => {
    const [invalid,setInvalid] = useState(false)
    function userLoggin(usuario,password) {
        var data = {
            usuario,
            password
        }
        fetch(`http://localhost:5000/usuarios/login`, {
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
                setInvalid(false)
                history.push("/inicio")
            }
            else{
                setInvalid(true)
            }
        })
    }
    let history = useHistory();
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
                <input    onClick={()=>{userLoggin(usuarioRef.current.value,passwordRef.current.value)}} className="btn btn-dark btn-block mt-3" value="INICIAR SESION" type="button"/>
            </form>
        </div>
    )
}

export default Inicio
