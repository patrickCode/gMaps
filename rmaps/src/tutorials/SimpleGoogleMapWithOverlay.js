import { useRef, useEffect, useState } from 'react';
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import { createCustomEqual } from "fast-equals";

function GooleMap({
    ...mapOptions
}) {
    const ref = useRef();
    const [map, setMap] = useState();

    const createLocateMeButton = () => {
        var locateMeDiv = document.createElement('div');

        // Set CSS for the button border
        var locateMeButton = document.createElement('div');
        locateMeButton.style.backgroundColor = 'rgba(51, 51, 51, 0.9)';
        locateMeButton.style.boxSizing = 'border-box';
        locateMeButton.style.borderRadius = '12px';
        locateMeButton.style.cursor = 'pointer';
        locateMeButton.style.marginBottom = '22px';
        locateMeButton.style.textAlign = 'center';
        locateMeButton.title = 'Click to recenter the map';
        locateMeDiv.appendChild(locateMeButton);
    
        // Set CSS for the button interior
        var locateMeText = document.createElement('div');
        locateMeText.style.color = '#FFFFFF';
        locateMeText.style.fontFamily = 'Work Sans';
        locateMeText.style.fontSize = '14px';
        locateMeText.style.fontWeight = '500';
        locateMeText.style.lineHeight = '16.42px';
        locateMeText.style.paddingLeft = '5px';
        locateMeText.style.paddingRight = '5px';
        locateMeText.innerHTML = 'Use my current location';
        locateMeButton.appendChild(locateMeText);

        return locateMeButton;
    }
    const locateMeButton = createLocateMeButton();
;
    useEffect(() => {
        if (ref.current && !map) {
            const gMap = new window.google.maps.Map(ref.current, {});
            gMap.controls[window.google.maps.ControlPosition.BOTTOM_CENTER].push(locateMeButton);
            setMap(gMap);
        }
    }, [ref, map]);

    

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
            <div ref={ref} id="map" style={{ flexGrow: "1", height: "500px" }} />
        </>
    );
}

export default GooleMap;