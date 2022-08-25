import GoogleMap from './SimpleGoogleMapWithOverlay';
import { useState, useEffect } from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';

const GOOGLE_MAP_API_KEY = '<<ENTER_YOUR_MAP_KEY>>';

const Map = () => {
    const zoom = 16;
    const [mapCenter, setMapCenter] = useState();
    const [isMapLoaded, setMapLoaded] = useState(false);
    const [isGeoLocationInProgress, setGeoLocationProgress] = useState(false);

    const centerMapAtCurrentLocation = function () {
        // To avoid multiple invocations of the centering funcion
        if (isGeoLocationInProgress) {
            return;
        }
        setGeoLocationProgress(true);
        window.navigator.geolocation.getCurrentPosition((position) => {
            const currentLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
            setMapCenter(currentLocation);
            setGeoLocationProgress(false);
            setMapLoaded(true);
        }, (error) => {
            if (error.code === error.PERMISSION_DENIED) {
                console.error('Map cannot be loaded if permission is denied');
                // Fallback to manual flow
            }
        });
    }

    useEffect(() => {
        // One time invocation of map centering
        if (!isMapLoaded) {
            centerMapAtCurrentLocation();
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