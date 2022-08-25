import { findAddress, findLocation } from './geocoder';
import { useEffect, useState } from 'react';
import Address from './address';
import GoogleMap from './GoogleMap';
import MapMarker from './MapMarker';
import { Wrapper } from '@googlemaps/react-wrapper';
import LocateMeButton from './locateMeButton';
import StaticMapMarker from './StaticMapMarker';

const GOOGLE_MAP_API_KEY = '<<ENTER_YOUR_MAP_KEY>>';
const USE_DRAGGABLE_MAP_PICKER = true;

const mapLoadingRender = (status) => {
    return <h2>{status}...</h2>
}

function Map() {
    const zoom = 16;
    const [mapCenter, setMapCenter] = useState();
    const [isMapLoaded, setMapLoaded] = useState(false);
    const [address, setAddress] = useState();
    const [isAddressLoading, setAddressLoading] = useState(true);
    const [isCenteringInProgress, setCenteringInProgress] = useState(false);
    const [locateMeButton, setLocateMeButton] = useState();
    const [staticMarker, setStaticMarker] = useState();

    const centerMapAtCurrentLocation = function () {
        // To avoid multiple invocations of the centering funcion
        if (isCenteringInProgress) {
            return;
        }
        setCenteringInProgress(true);
        window.navigator.geolocation.getCurrentPosition((position) => {
            const currentLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
            setMapCenter(currentLocation);
            showAddress(currentLocation);
            setCenteringInProgress(false);
            setMapLoaded(true);
        }, (error) => {
            if (error.code === error.PERMISSION_DENIED) {
                console.log('Map cannot be loaded if permission is denied');
                // Fallback to manual flow
            }
        });
    };

    useEffect(() => {
        // One time invocation of map centering
        if (!isMapLoaded) {
            centerMapAtCurrentLocation();
            setLocateMeButton(LocateMeButton(centerMapAtCurrentLocation));
            if (USE_DRAGGABLE_MAP_PICKER) {
                setStaticMarker(StaticMapMarker());
            }
        }
    }, [isMapLoaded]);


    const handlerMarkerLocationChange = (location) => {
        setMapCenter(location);
        showAddress(location);
    }

    const showAddress = (location) => {
        setAddressLoading(true);
        findAddress(location, GOOGLE_MAP_API_KEY).then((address) => {
            setAddress(address);
            setAddressLoading(false);
        }, (error) => {
            alert(`There was an error in setting the address - ${JSON.stringify(error)}`);
            setAddressLoading(false);
        });
    }

    const changeAddress = (address) => {
        setAddressLoading(true);
        findLocation(address, GOOGLE_MAP_API_KEY).then((address) => {
            if (address == null) {
                alert('Bad Address');
                centerMapAtCurrentLocation();
                return;
            }
            setAddress(address);
            setMapCenter(address.location);
            setAddressLoading(false)
        }, (error) => {
            alert(`There was an error in getting the location for the entered address - ${JSON.stringify(error)}`);
            setAddressLoading(false);
        });
    }

    const handleMapDragEnd = (center) => {
        if (!USE_DRAGGABLE_MAP_PICKER) return;
        showAddress(center);
        setMapCenter(center);
    }

    if (!isMapLoaded) {
        return (
            <>
                <h3>Please wait while we load the map. Ensure geolocation is turned on...</h3>
            </>

        )
    }
    return (
        <>
            <Wrapper apiKey={GOOGLE_MAP_API_KEY} render={mapLoadingRender}>
                <GoogleMap
                    centerMapAtCurrentLocation={centerMapAtCurrentLocation}
                    center={mapCenter} zoom={zoom}
                    locateMeButton={locateMeButton}
                    draggableSelectionPicker={USE_DRAGGABLE_MAP_PICKER}
                    staticMarker={staticMarker}
                    onDragEnd={handleMapDragEnd} >
                    {
                        !USE_DRAGGABLE_MAP_PICKER ? (
                            <MapMarker position={mapCenter} draggable={true} label={"H"} onLocationChanged={handlerMarkerLocationChange} />
                        ) : <></>
                    }

                </GoogleMap>
            </Wrapper>
            <Address
                mapCenter={mapCenter}
                address={address}
                isAddressLoading={isAddressLoading}
                changeAddress={changeAddress}
            />
        </>

    )

    // if (!USE_DRAGGABLE_MAP_PICKER) {
    //     return (
    //         <>
    //             <MapWithDynamicMarker
    //                 googleApiKey={GOOGLE_MAP_API_KEY}
    //                 loadingDisplay={mapLoadingRender}
    //                 centerMapAtCurrentLocation={centerMapAtCurrentLocation}
    //                 mapCenter={mapCenter}
    //                 zoom={zoom}
    //                 handlerMarkerLocationChange={handlerMarkerLocationChange}
    //             />
    //             <Address
    //                 mapCenter={mapCenter}
    //                 address={address}
    //                 isAddressLoading={isAddressLoading}
    //                 changeAddress={changeAddress}
    //             />
    //         </>
    //     );
    // }
    // return (
    //     <>
    //         <MapWithStaticMarker
    //             googleApiKey={GOOGLE_MAP_API_KEY}
    //             loadingDisplay={mapLoadingRender}
    //             centerMapAtCurrentLocation={centerMapAtCurrentLocation}
    //             mapCenter={mapCenter}
    //             zoom={zoom}
    //             handleMapDragEnd={handleMapDragEnd}
    //         />
    //         <Address
    //             mapCenter={mapCenter}
    //             address={address}
    //             isAddressLoading={isAddressLoading}
    //             changeAddress={changeAddress}
    //         />
    //     </>
    // );

}

export default Map;