function DisplayAddress({
    formattedAddress,
    country,
    state,
    city,
    district,
    sublocality,
    postalCode,
}) {
    return (
        <div>
            <h4>{formattedAddress}</h4>
            <table>
                <tbody>
                    <tr>
                        <td>Country</td>
                        <td>{country}</td>
                    </tr>
                    <tr>
                        <td>State</td>
                        <td>{state}</td>
                    </tr>
                    <tr>
                        <td>City/Town</td>
                        <td>{city}</td>
                    </tr>
                    <tr>
                        <td>District</td>
                        <td>{district}</td>
                    </tr>
                    <tr>
                        <td>Sub Locality</td>
                        <td>{sublocality}</td>
                    </tr>
                    <tr>
                        <td>Pincode</td>
                        <td>{postalCode}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default DisplayAddress;