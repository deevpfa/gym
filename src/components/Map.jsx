import React from 'react'
import {GoogleMap,withScriptjs,withGoogleMap,Marker} from 'react-google-maps'
import {lng,lat} from "../utils/global";
const Map = () => {
    return (
        <GoogleMap 
            zoom={15}
            center={{lat,lng}}
            marker={{lat,lng}}
        >
        <Marker
        position={{lat,lng}}/>    
        </GoogleMap>
        
    )
}

export default withScriptjs(
    withGoogleMap(
        Map
    )
)


