import React from 'react'
import { gymName,instagram,twitter,facebook } from "../utils/global";
import iconFacebook from "../assets/iconFacebook.svg";
import iconTwitter from "../assets/iconTwitter.svg";
import iconInstagram from "../assets/iconInstagram.svg";

const Footer = () => {
    return (
        <div className="footer">
            <ul>
                <p>Copyright {gymName} @ 2021</p>
                <li><a href={facebook}> <img src={iconFacebook} alt=""/></a></li>
                <li><a href={twitter}><img src={iconTwitter} alt=""/></a></li>
                <li><a href={instagram}><img src={iconInstagram} alt=""/></a></li>
            </ul>
            <div></div>
        </div>
    )
}

export default Footer
