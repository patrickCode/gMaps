import DisplayAddress from "./displayAddress"
import AddressInput from "./addressInput";

const Address = ({
    address,
    mapCenter,
    changeAddress,
    isAddressLoading,
}) => {
    if (isAddressLoading) {
        return (<></>);
    }
    return (
        <>
            <h4>
                @{mapCenter.lat},{mapCenter.lng}
            </h4>

            <DisplayAddress {...address} />
            <AddressInput onAddressEntered={changeAddress} />
        </>
    );
}

export default Address;
