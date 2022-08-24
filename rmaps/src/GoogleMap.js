import React, { useRef, useEffect, useState, Children, isValidElement, cloneElement } from 'react';
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import { createCustomEqual } from "fast-equals";
import CreateLocateMeButton from './locateMeButton';
import StaticMapMarker from './StaticMapMarker';

function GoogleMap({
    children,
    centerMapAtCurrentLocation,
    draggableSelectionPicker,
    onDragEnd,
    ...mapOptions
}) {
    const ref = useRef();
    const [map, setMap] = useState();

    useEffect(() => {
        if (ref.current && !map) {
            const gMap = new window.google.maps.Map(ref.current, {});
            const locateMeButton = CreateLocateMeButton(centerMapAtCurrentLocation);
            gMap.controls[window.google.maps.ControlPosition.BOTTOM_CENTER].push(locateMeButton);

            if (draggableSelectionPicker) {
                const staticMarker = StaticMapMarker();
                gMap.controls[window.google.maps.ControlPosition.CENTER].push(staticMarker);
            }
            setMap(gMap);
        }
    }, [ref, map]);

    // This is to ensure that the map doesn't load unnecessarily, unless the co-ordinates have changed
    useDeepCompareEffectForMaps(() => {
        if (map) {
            // Do not change the zoom if user has already zoomed on the map
            const currentMapZoom = map.getZoom();
            if (currentMapZoom && currentMapZoom !== mapOptions.zoom) {
                mapOptions.zoom = currentMapZoom;
            }
            map.setOptions(mapOptions);
            if (draggableSelectionPicker) {
                map.addListener('dragend', () => {
                    if (onDragEnd) {
                        onDragEnd(getCurrentLocation());
                    }
                });
            }
        }
    }, [map, mapOptions]);

    function useDeepCompareEffectForMaps(
        callback,
        dependencies
    ) {
        useEffect(callback, dependencies.map(useDeepCompareMemoize));
    }

    function useDeepCompareMemoize(value) {
        const ref = useRef();

        let deepCompareEqualsForMaps = createCustomEqual(
            (deepEqual) => (a, b) => {
                if (isLatLngLiteral(a) || isLatLngLiteral(b)) {
                    return new window.google.maps.LatLng(a).equals(new window.google.maps.LatLng(b));
                }
                return deepEqual(a, b);
            }
        );
        if (!deepCompareEqualsForMaps(value, ref.current)) {
            ref.current = value;
        }

        return ref.current;
    }

    function getCurrentLocation() {
        var center = map.getCenter();
        const coords = { lat: center.lat(), lng: center.lng() };
        return coords;
    }

    return (
        <>
            <div ref={ref} id="map" style={{ flexGrow: "1", height: "500px" }} />
            {Children.map(children, (child) => {
                if (isValidElement(child)) {
                    return cloneElement(child, { map })
                }
            })}
        </>
    );
}

export default GoogleMap;