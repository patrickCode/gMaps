import GoogleMap from './SimpleGoogleMap';
import { useState, useEffect } from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';

const GOOGLE_MAP_API_KEY = '<<ENTER_YOUR_MAP_KEY>>';

const Map = () => {
    const zoom = 16;
    const [mapCenter, setMapCenter] = useState();
    const [isMapLoaded, setMapLoaded] = useState(false);

    useEffect(() => {
        // One time invocation of map centering
        if (!isMapLoaded) {
            const hyderabadGoogleOffice = {lat: 17.4579539, lng: 78.3724765};
            setMapCenter(hyderabadGoogleOffice);
            setMapLoaded(true);
        }
    }, [isMapLoaded]);


    function loadingDisplay(status) {
        return <h2>{status}...</h2>
    }

    return (
        <Wrapper apiKey={GOOGLE_MAP_API_KEY} render={loadingDisplay}>
            <GoogleMap center={mapCenter} zoom={zoom} />
        </Wrapper>
    );
}

export default Map;