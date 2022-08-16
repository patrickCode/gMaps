import { useState, useEffect } from 'react';

function MapMarker({
    onLocationChanged,
    ...options
}) {
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
        if (marker) {
            marker.setOptions(options);

            marker.addListener('dragend', (event) => {
                const newLocation = { lat: event.latLng.lat(), lng: event.latLng.lng() };
                if (onLocationChanged) {
                    onLocationChanged(newLocation);
                }
            });

            setMarkerLoaded(true);

        }
    }, [marker, isMarkerLoaded, options, onLocationChanged]);


    // Since the marker is loaded in the map, null is returned from the marker component
    return null;
}

export default MapMarker;