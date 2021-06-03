import React from 'react'
import {GoogleMap,withScriptjs,withGoogleMap,Marker} from 'react-google-maps'

const Map = (props) => {
    let lat = props.lat
    let lng = props.lng

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


