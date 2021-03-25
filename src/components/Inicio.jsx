import React,{useState} from 'react'
import Nav from "./Nav";
import { useHistory } from "react-router-dom";
import { decodeToken } from "react-jwt";




const Inicio = () => {
    const [musculacion,setMusculacion] = useState("false")
    const [spinning,setSpinning] = useState("false")
    const [yoga,setYoga] = useState("false")
    const [funcional,setFuncional] = useState("false")

    const token = decodeToken(localStorage.getItem("token"))
    function datos(usuario) {
        var data = {
            usuario
        }
        fetch(`http://localhost:5000/usuarios/clases`, {
            method: 'POST', 
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json()) 
        .then(res=>{
            if(res.exito){
                setMusculacion(res.exito.musculacion)
                setSpinning(res.exito.spinning)
                setYoga(res.exito.yoga)
                setFuncional(res.exito.funcional)
            }
            else{
                console.log(res);
            }
        })
    }
    datos(token.nombreUser)
    let history = useHistory();
    return (
        <div className="containerInicio">
            <Nav/>
            <div className="divInicio">
                {
                    musculacion===true ? <div className="cuadro cuadro2" onClick={()=>{history.push("/calendar")}}><img className="noImg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRNMsDOmHm_JyVgjIg3ttecSe7vd5lps7duQ&usqp=CAU" alt=""/><p>MUSCULACION</p></div> : ""
                }
                {
                    spinning===true ? <div className="cuadro cuadro2" onClick={()=>{history.push("/calendar")}}><img className="noImg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAonXj6ZUSxKvwSGTAz_IHLIURNAxhZ_o76A&usqp=CAU" alt=""/><p>SPINNING</p></div> : ""
                }
                {
                    yoga===true ? <div className="cuadro cuadro2" onClick={()=>{history.push("/calendar")}}><img className="noImg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgRkBpX9G-d5l-x_NvXo-sD7kXMOhBda9Qog&usqp=CAU" alt=""/><p>YOGA</p></div> : ""
                }
                {
                    funcional===true ? <div className="cuadro cuadro2" onClick={()=>{history.push("/calendar")}}><img className="noImg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQty7jjpIAo29OaBVqalXpOJEbtEhJeLqlkDw&usqp=CAU" alt=""/><p>FUNCIONAL</p></div> : ""
                }  
            </div>
        </div>
    )
}

export default Inicio
