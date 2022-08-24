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
}) => {
    return (
        <Wrapper apiKey={googleApiKey} render={loadingDisplay}>
            <GoogleMap centerMapAtCurrentLocation={centerMapAtCurrentLocation} center={mapCenter} zoom={zoom}>
                <MapMarker position={mapCenter} draggable={true} label={"H"} onLocationChanged={handlerMarkerLocationChange} />
            </GoogleMap>
        </Wrapper>
    );
}

export default MapWithDynamicMarker;