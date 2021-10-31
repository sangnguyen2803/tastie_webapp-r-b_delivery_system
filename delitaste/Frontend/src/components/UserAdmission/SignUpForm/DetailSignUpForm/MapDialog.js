import React from "react";
import './MapDialog.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/fontawesome-free-solid';
import { GoogleMap, useJsApiLoader, LoadScript, Marker, StandaloneSearchBox, Autocomplete} from '@react-google-maps/api';
const containerStyle = {
    width: '100%',
    height: '450px',
};
//import styled from "styled-components";

/*
const Background = styled.div`
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        position: fixed;
        top: 0%;
        left: 0%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        z-index: 10;
    `

const MapDialogWrapper = styled.div`
        width: 70%;
        height: 75%;
        background: #fff;
        position: relative;
        z-index: 10;
        color: black;
        
    `
*/
function MapDialog({ showMapDialog, setShowMapDialog }) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBROKXl2k41UwBJx-cUF5lbx1kLn_TqTyQ"
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])
    return (
        <>
            {showMapDialog ? (
                <div className="dialog-background">
                    <div className="map-dialog-wrapper">
                        <div className="map-dialog-components">
                            <div className="title-map-dialog-wrapper">
                                <span className="dialog-title">Find Your Location On Google Map</span>
                                <FontAwesomeIcon onClick={() => setShowMapDialog(prev => !prev)} className="form-icon" icon={faTimes} />
                            </div>
                            <div className="map-api-wrapper">
                                <div className="map-api-section">
                                    <GoogleMap
                                        zoom={10}
                                        onLoad={onLoad}
                                        onUnmount={onUnmount}
                                        mapContainerStyle={containerStyle}
                                    >
                                    </GoogleMap>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>) : null}
        </>
    )
}

export default MapDialog;