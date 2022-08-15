import { useState, useEffect } from 'react';

function MapMarker(options) {
    const [marker, setMarker] = useState();
    const [isMarkerLoaded, setMarkerLoaded] = useState(false);

    useEffect(() => {
        if (!marker) {
            setMarker(new window.google.maps.Marker());
        }

        // Remove marker from map on unmount
        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [marker]);

    useEffect(() => {
        if (marker && !isMarkerLoaded) {
            marker.setOptions(options);
            marker.setDraggable(true);
            setMarkerLoaded(true);

            marker.addListener('dragend', (e) => {
                console.log(e.latLng.lat());
                console.log(e.latLng.lng());
            });
        }
    }, [isMarkerLoaded, options]);


    // Since the marker is loaded in the map, null is returned from the marker component
    return null;
}

export default MapMarker;