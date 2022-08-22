import GoogleMap from './GoogleMap';
import MapMarker from './MapMarker';
import { findAddress, findLocation } from './geocoder';
import { useEffect, useState } from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';
import Address from './address';
import AddressInput from './addressInput';

const GOOGLE_MAP_API_KEY = 'AIzaSyDNEusX-n0cmkMes2CsAXrRAmVFrClf4vA';

const mapLoadingRender = (status) => {
    return <h2>{status}...</h2>
}

function Map() {
    const zoom = 16;

    const [mapCenter, setMapCenter] = useState();
    const [isMapLoading, setMapLoading] = useState(true);
    const [isMapLoaded, setMapLoaded] = useState(false);
    const [address, setAddress] = useState();
    const [isAddressLoading, setAddressLoading] = useState(true);
    const [isCenteringInProgress, setCenteringInProgress] = useState(false);

    const centerMapAtCurrentLocation = function () {
        if (isCenteringInProgress) {
            return;
        }
        setCenteringInProgress(true);
        setMapLoading(true);
        window.navigator.geolocation.getCurrentPosition((position) => {
            const currentLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
            setMapCenter(currentLocation);
            showAddress(currentLocation);
            setMapLoading(false);
            setCenteringInProgress(false);
            setMapLoaded(true);
        });
    }

    useEffect(() => {
        if (isMapLoading) {
            centerMapAtCurrentLocation();
        }
    }, [isMapLoading]);


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

    if (!isMapLoaded) {
        return (
            <>
                <h3>Please wait while we load the map. Ensure geolocation is turned on...</h3>
                <button value='Locate Me' onClick={centerMapAtCurrentLocation}>Locate Me</button>
                {
                    isAddressLoading ? (<h4>Loading...</h4>) : <Address {...address} />
                }
                <AddressInput onAddressEntered={changeAddress} />
            </>

        )
    }
    return (
        <>
            <Wrapper apiKey={GOOGLE_MAP_API_KEY} render={mapLoadingRender}>
                <GoogleMap centerMapAtCurrentLocation={centerMapAtCurrentLocation} center={mapCenter} zoom={zoom}>
                    <MapMarker position={mapCenter} draggable={true} label={"H"} onLocationChanged={handlerMarkerLocationChange} />
                </GoogleMap>
            </Wrapper>
            <h4>
                @{mapCenter.lat},{mapCenter.lng}
            </h4>
            <button value='Locate Me' onClick={centerMapAtCurrentLocation}>Locate Me</button>
            {
                isAddressLoading ? (<h4>Loading...</h4>) : <Address {...address} />
            }
            <AddressInput onAddressEntered={changeAddress} />
        </>
    );
}

export default Map;