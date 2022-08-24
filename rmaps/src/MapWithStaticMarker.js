import GoogleMap from './GoogleMap';
import { Wrapper } from '@googlemaps/react-wrapper';

const MapWithStaticMarker = ({
    googleApiKey,
    loadingDisplay,
    centerMapAtCurrentLocation,
    mapCenter,
    zoom,
    handleMapDragEnd,
}) => {
    return (
        <Wrapper apiKey={googleApiKey} render={loadingDisplay}>
            <GoogleMap centerMapAtCurrentLocation={centerMapAtCurrentLocation} draggableSelectionPicker={true} onDragEnd={handleMapDragEnd} center={mapCenter} zoom={zoom} />
        </Wrapper>
    );
}

export default MapWithStaticMarker;