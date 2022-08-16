import axios from "axios";

const http = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api'
});

function findAddress(location, key) {
    return http.get('geocode/json', {
        params: {
            latlng: `${location.lat},${location.lng}`,
            key,
        }
    })
    .then((response) => {
        if (response.status !== 200) {
            return null;
        }
        const results = response.data.results;
        if (results == null || results.length === 0) {
            return null;
        }

        const address = {
            formattedAddress: results[0].formatted_address,
        };

        results[0].address_components.forEach(addressComponent => {
            if (addressComponent.types.includes('country') && addressComponent.types.includes('political')) {
                address.country = addressComponent.long_name;
            }
            if (addressComponent.types.includes('administrative_area_level_1') && addressComponent.types.includes('political')) {
                address.state = addressComponent.long_name;
            }
            if (addressComponent.types.includes('locality') && addressComponent.types.includes('political')) {
                address.city = addressComponent.long_name;
            }       
            if (addressComponent.types.includes('administrative_area_level_2') && addressComponent.types.includes('political')) {
                address.district = addressComponent.long_name;
            }
            if (addressComponent.types.includes('sublocality') && addressComponent.types.includes('political')) {
                if (address.sublocality == null) {
                    address.sublocality = addressComponent.long_name;
                }
                else {
                    address.sublocality += `, ${addressComponent.long_name}`;
                }
            }
            if (addressComponent.types.includes('postal_code')) {
                address.postalCode = addressComponent.long_name;
            }
        });
        return address;
    })
}

function findLocation(address, key) {
    debugger;
    address = encodeURI(address);
    return http.get('geocode/json', {
        params: {
            address,
            key,
            region: 'in'
        }
    })
    .then((response => {
        if (response.data.status === 'ZERO_RESULTS') {
            return null;
        }

        const results = response.data.results;
        console.log(results);
        console.log(results[0]);
        console.log(results[0].formatted_address);
        debugger;

        const address = {
            formattedAddress: results[0].formatted_address,
            location: results[0].geometry.location
        };

        results[0].address_components.forEach(addressComponent => {
            if (addressComponent.types.includes('country') && addressComponent.types.includes('political')) {
                address.country = addressComponent.long_name;
            }
            if (addressComponent.types.includes('administrative_area_level_1') && addressComponent.types.includes('political')) {
                address.state = addressComponent.long_name;
            }
            if (addressComponent.types.includes('locality') && addressComponent.types.includes('political')) {
                address.city = addressComponent.long_name;
            }       
            if (addressComponent.types.includes('administrative_area_level_2') && addressComponent.types.includes('political')) {
                address.district = addressComponent.long_name;
            }
            if (addressComponent.types.includes('sublocality') && addressComponent.types.includes('political')) {
                if (address.sublocality == null) {
                    address.sublocality = addressComponent.long_name;
                }
                else {
                    address.sublocality += `, ${addressComponent.long_name}`;
                }
            }
            if (addressComponent.types.includes('postal_code')) {
                address.postalCode = addressComponent.long_name;
            }
        });
        return address;
    }));
}

export { findAddress, findLocation };