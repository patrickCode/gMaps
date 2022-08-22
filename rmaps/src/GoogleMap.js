import React, { useRef, useEffect, useState, Children, isValidElement, cloneElement } from 'react';
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import { createCustomEqual } from "fast-equals";

function GoogleMap({
    children,
    centerMapAtCurrentLocation,
    ...mapOptions
}) {
    const ref = useRef();
    const [map, setMap] = useState();

    useEffect(() => {
        if (ref.current && !map) {
            const gMap = new window.google.maps.Map(ref.current, {});
            var controlDiv = document.createElement('div');

            // Set CSS for the control border
            var controlUI = document.createElement('div');
            controlUI.style.backgroundColor = '#fff';
            controlUI.style.border = '2px solid #fff';
            controlUI.style.cursor = 'pointer';
            controlUI.style.marginBottom = '22px';
            controlUI.style.textAlign = 'center';
            controlUI.title = 'Click to recenter the map';
            controlDiv.appendChild(controlUI);

            // Set CSS for the control interior
            var controlText = document.createElement('div');
            controlText.style.color = 'rgb(25,25,25)';
            controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
            controlText.style.fontSize = '16px';
            controlText.style.lineHeight = '38px';
            controlText.style.paddingLeft = '5px';
            controlText.style.paddingRight = '5px';
            controlText.innerHTML = '<h3>Locate Me</h3>';
            controlUI.appendChild(controlText);
            controlUI.addEventListener('click', () => {
                if (centerMapAtCurrentLocation) {
                    centerMapAtCurrentLocation();
                }
            })
            gMap.controls[window.google.maps.ControlPosition.BOTTOM_CENTER].push(controlDiv);
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