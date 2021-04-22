import React, { useState, useRef,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { setDays,getData,capitalize } from '../utils/functions'
import iconHome from "../assets/iconHome.svg";
import iconProfile from "../assets/iconProfile.svg";
import iconBurger from "../assets/iconBurger.svg";
import iconClose from "../assets/iconClose.svg";





const Nav = (props) => {
    let history = useHistory();
    useEffect(() => {
        getData().then((res)=>{
            setAdmin(res.isAdmin)
            setExpiration(setDays(res.expiration))
        })
    }, [])
    const burgerMenuRef = useRef(null)
    const [admin, setAdmin] = useState(false)
    const [burgerState, setBurgerState] = useState(false)
    const [expiration, setExpiration] = useState("")
   
   
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
                <li className="underline" >
                    <Link to="/inicio" ><img src={iconHome} alt="" /></Link>
                    { props.active==="home" ? <span className="spanIcon"></span> : ""}
                </li>
                {
                    admin === true ?
                        <li className="letterAdmin"><Link to="/admin">Administracion</Link></li>
                        :
                        <li className="underline profile">
                            <Link to="/profile"  ><img src={iconProfile} alt="" /></Link>
                            { props.active==="profile" ? <span className="spanIcon"></span> : ""}
                        </li>
                }
                { admin === false ? <li className="nombreNav">{capitalize(localStorage.getItem("nombre"))}</li>: ""}
                {
                    admin === true ?
                        <li className="none"></li>
                        :
                        <li className="vencimiento center">Vencimiento <br /> en {expiration} dias</li>
                }
                <li onClick={() => { history.push("/") }} className="closeSession" >
                    <div className="btn-block"><Link className="nav-link" to="/">Cerrar Sesion</Link></div>
                </li>
                <li className="burgerMenu" onClick={(e) => burgerOn(e, setBurgerState)}>
                    <img src={iconBurger} alt="" ref={burgerMenuRef} />
                </li>

            </ul>
            {
                burgerState === true ? <div className="burgerOpen" data-aos="fade-down">
                    <p>{capitalize(localStorage.getItem("nombre"))}</p>
                    <p className="vencimiento">Vencimiento <br />en {expiration} dias</p>
                    <p onClick={() => history.push("/")}><Link className="nav-link" to="/">Cerrar Sesion</Link></p>
                </div>
                    : ""
            }

        </div>
    )
}

export default Nav