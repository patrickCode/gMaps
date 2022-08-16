import React, { useRef, useEffect, useState, Children, isValidElement, cloneElement } from 'react';
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import { createCustomEqual } from "fast-equals";

function GoogleMap({
    children,
    ...mapOptions
}) {
    const ref = useRef();
    const [map, setMap] = useState();

    useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {}));
        }
    }, [ref, map]);

    // This is to ensure that the map doesn't load unnecessarily, unless the co-ordinates have changed
    useDeepCompareEffectForMaps(() => {
        console.log("Here 321");
        if (map) {
            // Do not change the zoom if user has already zoomed on the map
            const currentMapZoom = map.getZoom();
            if (currentMapZoom && currentMapZoom !== mapOptions.zoom) {
                mapOptions.zoom = currentMapZoom;
            }
            map.setOptions(mapOptions);
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

    return (
        <>
            <div ref={ref} id="map" style={{ flexGrow: "1", height: "1000px" }} />
            {Children.map(children, (child) => {
                if (isValidElement(child)) {
                    return cloneElement(child, { map })
                }
            })}
        </>
    );
}

export default GoogleMap;