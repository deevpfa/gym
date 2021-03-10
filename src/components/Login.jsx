import React from 'react'
import {Link} from 'react-router-dom'
const Inicio = () => {

    return (
        <div  className="m-auto divLogin" data-aos="slide-left" >
            <form   className="form-group" data-aos="zoom-in">
                <input   className="form-control" placeholder="USUARIO" type="text"/>
                <input   className="form-control mt-3" placeholder="PASSWORD" type="password"/>
                <input   className="btn btn-dark btn-block mt-3" value="REGISTRAR" type="button"/>
                <Link to="/inicio"><input className="btn btn-danger btn-block mt-3" value="INICIAR SESION" type="button"/></Link>
            </form>
        </div>
    )
}

export default Inicio
