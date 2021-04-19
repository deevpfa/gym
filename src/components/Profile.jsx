import React,{useRef} from 'react'
import Nav from "./Nav";
import WhatsApp from "./WhatsApp";


const Profile = () => {
    const mapRef = useRef(null)
    return (
        <div>
            <Nav/>
            <div ref={mapRef}></div>
            <WhatsApp/>
            
        </div>
    )
}

export default Profile
