import React from 'react'
import {useEffect,useState} from 'react'
import iconFacebook from "../assets/iconFacebook.svg";
import {server} from "../utils/global"
// import iconTwitter from "../assets/iconTwitter.svg";
import iconInstagram from "../assets/iconInstagram.svg";

const Footer = () => {
    useEffect(() => {
        datos()
    }, [])
    const [gymName,setgymName] = useState()
    const [facebook,setfacebook] = useState()
    const [instagram,setginstagram] = useState()
    // const [twitter,settwitter] = useState()
    async function datos() {
        await fetch(`${server}/initialize`)
        .then(res => res.json()) 
        .then(data => {
            setgymName(data.config.gymName)
            setfacebook(data.config.facebook)
            setginstagram(data.config.instagram)
        })
        
    }
    
    return (
        <div className="footer">
            <ul>
                <p>Copyright {gymName} @ 2021</p>
                <div className="socialMedia">
                <li><a href={facebook}> <img src={iconFacebook} alt=""/></a></li>
                {/* <li><a href={twitter}><img src={iconTwitter} alt=""/></a></li> */}
                <li><a href={instagram}><img src={iconInstagram} alt=""/></a></li>
                </div>
            </ul>
            <div></div>
        </div>
    )
}

export default Footer
