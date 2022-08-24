const StaticMapMarker = () => {
    var staticMarkerDiv = document.createElement('div');

    // Set CSS for the control border
    var staticMarkerButton = document.createElement('div');
    staticMarkerButton.style.backgroundColor = '#fff';
    staticMarkerButton.style.border = '2px solid #fff';
    staticMarkerButton.style.cursor = 'pointer';
    staticMarkerButton.style.marginBottom = '22px';
    staticMarkerButton.style.textAlign = 'center';
    staticMarkerButton.title = 'Click to recenter the map';
    staticMarkerDiv.appendChild(staticMarkerButton);

    // Set CSS for the control interior
    var staticMarkerText = document.createElement('div');
    staticMarkerText.style.color = 'rgb(25,25,25)';
    staticMarkerText.style.fontFamily = 'Roboto,Arial,sans-serif';
    staticMarkerText.style.fontSize = '16px';
    staticMarkerText.style.lineHeight = '38px';
    staticMarkerText.style.paddingLeft = '5px';
    staticMarkerText.style.paddingRight = '5px';
    staticMarkerText.innerHTML = '<h3>MARKER</h3>';
    staticMarkerButton.appendChild(staticMarkerText);

    return staticMarkerDiv;
}

export default StaticMapMarker;