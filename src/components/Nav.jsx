import React, { useState, useRef,useEffect,useContext} from 'react'
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { setDays,getData,capitalize } from '../utils/functions'
import iconHome from "../assets/iconHome.svg";
import iconProfile from "../assets/iconProfile.svg";
import iconBurger from "../assets/iconBurger.svg";
import iconClose from "../assets/iconClose.svg";
import { UserContext } from './UserContext';





const Nav = () => {
    let history = useHistory();
    useEffect(() => {
        getData().then((res)=>{
            setAdmin(res.isAdmin)
            setExpiration(setDays(res.expiration))
        })
    }, [])
    const {stateNav} = useContext(UserContext)

    const burgerMenuRef = useRef(null)
    const [admin, setAdmin] = useState("")
    const [burgerState, setBurgerState] = useState(false)
    const [expiration, setExpiration] = useState("")
   
   function closeSession() {
        localStorage.removeItem("token")
        history.push("/")
   }
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
                    { stateNav==="home" ? <span className="spanIcon"></span> : ""}
                </li>
                {
                    admin === true ?
                        <div>
                            <li className="letterAdmin underlineAdm"><Link to="/admin">Administracion</Link> 
                            { stateNav==="admin" ? <span className="spanIconAdm"></span> : ""}
                            </li>
                            <li className="none"></li>
                        </div>
                        :
                        <div  className="div-container-nav">
                            <li className="underline profile">
                                <Link to="/profile"  ><img src={iconProfile} alt="" /></Link>
                                { stateNav==="profile" ? <span className="spanIcon"></span> : ""}
                            </li>   
                            <li className="nombreNav">{capitalize(localStorage.getItem("nombre"))}</li>
                            {
                                expiration<0 ? <li className="vencimiento center">Vencido</li>
                                :<li className="vencimiento center">Vencimiento <br /> en {expiration} dias</li>
                            }
                        </div>
                }
                <li onClick={() => closeSession()} className="closeSession" >
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
                    <p onClick={() => closeSession()}><Link className="nav-link" to="/">Cerrar Sesion</Link></p>
                </div>
                    : ""
            }

        </div>
    )
}

export default Nav