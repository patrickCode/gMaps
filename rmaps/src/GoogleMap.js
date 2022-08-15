import React, { useRef, useEffect, useState, Children, isValidElement, cloneElement } from 'react';

function GoogleMap({
    children,
    ...mapOptions
}) {
    const ref = useRef();
    const [map, setMap] = useState();

    useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, mapOptions));
        }
    }, [ref, map]);

    // return <div ref={ref} id="map" style={{ height: '1000px' }} />;
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