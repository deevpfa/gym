import React,{useState,useRef,useEffect} from 'react'
import { server } from "../utils/global";
import { allClases } from "../utils/functions";
import iconDownload from "../assets/download.png";
import guiaExcel from "../assets/Guia.xlsx";
import xlsx from 'xlsx'
import swal from 'sweetalert'


const Turnos = () => {
    useEffect(() => {
        allClases(idRef,claseRef)
    }, [])
    const [archivos,setArchivos] = useState()
    const idRef = useRef(null)
    const claseRef = useRef(null)
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
            console.log(datosExcel);
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
                    title:`${res.error}`,
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
            <div className="turnos-container">
                <h2>Elija el archivo excel a subir:</h2>
                <a href={guiaExcel}><img src={iconDownload} alt="" />Descargar guia</a>
                <input type="file" accept=".xlsx" name="files" onChange={(e)=>subirArchivos(e.target.files[0])} />
                <button className="btn btn-success" onClick={(e)=> addFile(e)}>CARGAR</button>
                <div className="addClass-clases mt-5">
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

export default Turnos
