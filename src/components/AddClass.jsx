import React, { useRef} from 'react'
import { server } from "../utils/global";
import Nav from "./Nav";

const AddClass = () => {
    const nombreRef = useRef(null)
    const imgRef = useRef(null)
   async function sendInfo(e,nombreClase,imagen) {
       e.preventDefault()
        var data = {
            clase:nombreClase,
            img:imagen
        }
        await fetch(`${server}/clases/agregar`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(res => {res.success ? alert("Cargado con exito") : alert("Ha ocurrido un error, vuelve a intentarlo")
                if(window.confirm) window.location.reload()
            })
    }
    return (
        <div>
            <Nav/>
            <div className="addClass-container">
                <h2>Elija un nombre y una imagen para su clase:</h2>
                <div className="addClass-name"><input ref={nombreRef} className="form-control" placeholder="Nombre" type="text" /></div>
                <div className="addClass-name"><input ref={imgRef} className="form-control" placeholder="URL Imagen" type="text" /></div>
                {/* <input  placeholder="Nombre" type="text"/>   */}
                <div><button className="btn btn-success" onClick={(e)=> sendInfo(e,nombreRef.current.value,imgRef.current.value)}>CARGAR</button></div> 
            </div>
        </div>
    )
}

export default AddClass
