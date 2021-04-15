import React, { useState,useEffect,useRef} from 'react'
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import {ValidateUser,setDays} from '../utils/functions'
import iconHome from "../assets/iconHome.svg";
import iconProfile from "../assets/iconProfile.svg";
import iconBurger from "../assets/iconBurger.svg";
import iconClose from "../assets/iconClose.svg";



const Nav = () => {
    useEffect(() => {
        getData()
        
    }, [])
    const burgerMenuRef = useRef(null)
    const [admin,setAdmin] = useState(false)
    const [burgerState,setBurgerState] = useState(false)
    const [expiration,setExpiration] = useState(false)
    async function getData() {
        const user = await ValidateUser()
        setAdmin(user.isAdmin)
        setExpiration(setDays(user.expiration))
        
    }
    let history = useHistory();
    function burgerOn(e) {
        if (burgerState===false) {
            burgerMenuRef.current.src = iconClose
            setBurgerState(true)
            document.body.style.overflow = "hidden"
        }
        else{
            burgerMenuRef.current.src = iconBurger   
            setBurgerState(false) 
            document.body.style.overflow = ""
        }
    }
    
    return (

        <div className="containerNav" data-aos="fade-down">
                <ul className="lista-nav">
                    <li>
                        <Link  to="/inicio" className="iconHome"><img src={iconHome} alt=""/></Link>
                    </li>
                    {
                        admin === true ?
                            <li><Link  to="/admin">Admin</Link></li> :
                            <li className="profile">
                                <Link  to="/inicio"  ><img src={iconProfile} alt=""/></Link>
                            </li>
                    }
                    {
                        admin === true ? 
                        <li></li> : <li className="vencimiento center">Vencimiento <br/> en {expiration} dias</li>
                    }
                    <li onClick={() => { history.push("/") }} className="closeSession" >
                        <div className="btn btn-dark btn-block "><Link className="nav-link" to="/">Cerrar Sesion</Link></div>
                    </li>
                    <li className="burgerMenu"  onClick={(e)=> burgerOn(e)}>
                        <img src={iconBurger} alt="" ref={burgerMenuRef}/ >
                    </li>
                </ul>
                {
                    burgerState===true ? <div className="burgerOpen" data-aos="fade-down">
                    <p className="vencimiento">Vencimiento <br/>en {expiration} dias</p>
                    <p>Nuestro WhatsApp</p>
                    <p><Link className="nav-link" to="/">Cerrar Sesion</Link></p>
                    </div> : ""
                }
        </div>
    )
}

export default Nav