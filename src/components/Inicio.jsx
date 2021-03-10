import React from 'react'
import {Component} from 'react'

class Inicio extends Component{
    constructor(){
        this.img = React.createRef()
        this.cambiarImg = this.cambiarImg.bind( this )
    }
    cambiarImg() {
        this.img.current.style.margin = "0"
    }
    render(){
    return (
        <div className="containerInicio">
            <h1>Bienvenido Patricio</h1>
            <div className="divInicio">
                <div className="cuadro " onClick={this.cambiarImg}><img className="noImg" ref={this.img} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRNMsDOmHm_JyVgjIg3ttecSe7vd5lps7duQ&usqp=CAU" alt=""/>MUSCULACION</div>
                <div className="cuadro"></div>
                <div className="cuadro"></div>
                <div className="cuadro"></div>
            </div>
        </div>
    )
}
}

export default Inicio
