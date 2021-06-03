import React,{useEffect,useState} from 'react'
import { server } from "../utils/global";
import iconWhatsapp from "../assets/iconWhatsapp.png";
const WhatsApp = () => {
    useEffect(() => {
        datos()
    }, [])
    const [phone,setphone] = useState()
    async function datos() {
        await fetch(`${server}/initialize`)
        .then(res => res.json()) 
        .then(data => {
            setphone(data.config.phone)
        })
        
    }
    return (
        <div className="whatsapp">
            <a href={phone}><img src={iconWhatsapp} alt=""/></a>
        </div>
        
    )
}

export default WhatsApp
