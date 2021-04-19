import React, { useState, useEffect, useRef, useContext } from 'react'
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { setDays,getData } from '../utils/functions'
import iconHome from "../assets/iconHome.svg";
import iconProfile from "../assets/iconProfile.svg";
import iconBurger from "../assets/iconBurger.svg";
import iconClose from "../assets/iconClose.svg";





const Nav = () => {
    let history = useHistory();
    const burgerMenuRef = useRef(null)
    const [admin, setAdmin] = useState(false)
    const [burgerState, setBurgerState] = useState(false)
    const [expiration, setExpiration] = useState("")
    getData().then((res)=>{
        setAdmin(res.isAdmin)
        setExpiration(setDays(res.expiration))
    })
   
    function burgerOn(e, setBurgerState) {
        if (burgerState === false) {
            burgerMenuRef.current.src = iconClose
            setBurgerState(true)
            document.body.style.overflow = "hidden"
        }
        else {
            burgerMenuRef.current.src = iconBurger
            setBurgerState(false)
            document.body.style.overflow = ""
        }
    }

    return (

        <div className="containerNav" data-aos="fade-down">
            <ul className="lista-nav">
                <li>
                    <Link to="/inicio" className="iconHome"><img src={iconHome} alt="" /></Link>
                </li>
                {
                    admin === true ?
                        <li className="letterAdmin"><Link to="/admin">Administracion</Link></li>
                        :
                        <li className="profile">
                            <Link to="/profile"  ><img src={iconProfile} alt="" /></Link>
                        </li>
                }
                {
                    admin === true ?
                        <li className="none"></li>
                        :
                        <li className="vencimiento center">Vencimiento <br /> en {expiration} dias</li>
                }
                <li onClick={() => { history.push("/") }} className="closeSession" >
                    <div className="btn btn-dark btn-block "><Link className="nav-link" to="/">Cerrar Sesion</Link></div>
                </li>
                <li className="burgerMenu" onClick={(e) => burgerOn(e, setBurgerState)}>
                    <img src={iconBurger} alt="" ref={burgerMenuRef} />
                </li>

            </ul>
            {
                burgerState === true ? <div className="burgerOpen" data-aos="fade-down">
                    <p className="vencimiento">Vencimiento <br />en {expiration} dias</p>
                    <p onClick={() => history.push("/")}><Link className="nav-link" to="/">Cerrar Sesion</Link></p>
                </div>
                    : ""
            }

        </div>
    )
}

export default Nav