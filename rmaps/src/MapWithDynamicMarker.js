import GoogleMap from './GoogleMap';
import MapMarker from './MapMarker';
import { Wrapper } from '@googlemaps/react-wrapper';

const MapWithDynamicMarker = ({
    googleApiKey,
    loadingDisplay,
    centerMapAtCurrentLocation,
    mapCenter,
    zoom,
    handlerMarkerLocationChange,
    staticMarker,
}) => {
    return (
        <Wrapper apiKey={googleApiKey} render={loadingDisplay}>
            <GoogleMap centerMapAtCurrentLocation={centerMapAtCurrentLocation} center={mapCenter} zoom={zoom}>
                {
                    staticMarker ? <></> : (
                        <MapMarker position={mapCenter} draggable={true} label={"H"} onLocationChanged={handlerMarkerLocationChange} />
                    )
                }
                
            </GoogleMap>
        </Wrapper>
    );
}

export default MapWithDynamicMarker;