import React, { useRef,useEffect} from 'react'
import { server } from "../utils/global";
import { allClases } from "../utils/functions";
import swal from 'sweetalert'

const AddClass = () => {
    useEffect(() => {
        allClases(idRef,claseRef)
    }, [])
    const nombreRef = useRef(null)
    const imgRef = useRef(null)
    const idRef = useRef(null)
    const claseRef = useRef(null)
   async function sendInfo(e,nombreClase,imagen) {
       e.preventDefault()
       if(!imagen || !nombreClase){
            swal({
            title:"Falta nombre o imagen",
            icon:"error",
            buttons:"Ok"
       })
       return
    }
        var data = {
            token:localStorage.getItem("token"),
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
            .then(res => {res.success ? 
                swal({
                title:"Clase cargada con exito",
                text:`ID CLASE : ${res.success.id}`,
                icon:"success",
                buttons:"Ok"
            }).then(resp=> resp ? window.location.reload() : "") 
            :  
            swal({
                title:"Ha ocurrido un error, vuelve a intentarlo",
                icon:"error",
                buttons:"Ok"
            }).then(resp=> resp ? window.location.reload() : "")
            })
    }
    
    return (
        <div>
            <div className="addClass-container">
                <h2>Elija un nombre y una imagen para su clase:</h2>
                <div className="addClass-name"><input ref={nombreRef} className="form-control" placeholder="Nombre" type="text" /></div>
                <div className="addClass-name"><input ref={imgRef} className="form-control" placeholder="URL Imagen" type="text" /></div>
                <div><button className="btn btn-success" onClick={(e)=> sendInfo(e,nombreRef.current.value,imgRef.current.value)}>CARGAR</button></div>
                <div className="addClass-clases">
                    <div>
                    <p>ID</p>
                    <div ref={idRef}></div>
                    </div>
                    <div>
                    <p>CLASE</p>
                    <div ref={claseRef}></div>
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default AddClass
