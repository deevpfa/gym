import React from 'react'
import { phone } from "../utils/global";
import iconWhatsapp from "../assets/iconWhatsapp.png";
const WhatsApp = () => {
    return (
        <div className="whatsapp"><a href={phone}><img src={iconWhatsapp} alt=""/></a></div>
    )
}

export default WhatsApp
