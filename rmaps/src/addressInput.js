import { useState } from "react";

const AddressInput = ({
    onAddressEntered
}) => {
    const [address, setAddress] = useState();

    const handleAddressSubmit = () => {
        if (onAddressEntered) {
            onAddressEntered(address);
        }
    }

    return (
        <div>
            <label htmlFor='address'>Enter address:</label>
            <input id='address' type='text' placeholder="Enter your full address" onInput={evt => setAddress(evt.target.value)} />
            <button onClick={handleAddressSubmit}>Search</button>
        </div>
    )
}

export default AddressInput;
