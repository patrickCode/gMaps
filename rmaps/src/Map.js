import { useRef, useEffect, useState } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import GoogleMap from './GoogleMap';
import MapMarker from './MapMarker';

const mapLoadingRender = (status) => {
    return <h2>{status}...</h2>
}

function Map() {
    const zoom = 14;

    const [mapCenter, setMapCenter] = useState();
    const [isMapLoading, setMapLoading] = useState(true);

    window.navigator.geolocation.getCurrentPosition((position) => {
        const mapCenter = { lat: position.coords.latitude, lng: position.coords.longitude };
        setMapCenter(mapCenter);
        setMapLoading(false);
    });

    if (isMapLoading) {
        return (
            <h3>Please wait while we load the map. Ensure geolocation is turned on...</h3>
        )
    }
    return (
        <Wrapper apiKey="AIzaSyDNEusX-n0cmkMes2CsAXrRAmVFrClf4vA" render={mapLoadingRender}>
            <GoogleMap center={mapCenter} zoom={zoom}>
                <MapMarker position={mapCenter} draggable={true} label={"H"} />
            </GoogleMap>
        </Wrapper>
    );
}

export default Map;