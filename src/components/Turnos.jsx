import React,{useState} from 'react'
import Nav from "./Nav";
import { server } from "../utils/global";
import xlsx from 'xlsx'
import swal from 'sweetalert'


const Turnos = () => {
    const [archivos,setArchivos] = useState()
    const subirArchivos = e =>{setArchivos(e)}
    async function addFile(e) {
        e.preventDefault()
        let newReader = new FileReader()
        newReader.readAsBinaryString(archivos)
        newReader.onload= (e)=>{
            let d = e.target.result
            let excel = xlsx.read(d,{type:'binary'})
            let nombreHoja = excel.SheetNames
            let datosExcel = xlsx.utils.sheet_to_json(excel.Sheets[nombreHoja[0]])
            var data ={
                datosExcel
            }
            fetch(`${server}/turnos/agregarTurno`, {
                method: 'POST', 
                body: JSON.stringify(data),
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json()) 
            .then(res => { res.error ?
                swal({
                    title:"Ha ocurrido un error, vuelve a intentarlo",
                    icon:"error",
                    buttons:"Ok"
                }).then(resp=> resp ? window.location.reload() : "")
            
            : 
                swal({
                    title:"Turno cargado con exito",
                    icon:"success",
                    buttons:"Ok"
                }).then(resp=> resp ? window.location.reload() : "")
            })
    }}
    return (
        <div>
            <Nav/>
            <div className="turnos-container">
                <h2>Elija el archivo excel a subir:</h2>
                <input type="file" accept=".xlsx" name="files" onChange={(e)=>subirArchivos(e.target.files[0])} />
                <button className="btn btn-success" onClick={(e)=> addFile(e)}>CARGAR</button>
            </div>
        </div>
    )
}

export default Turnos
