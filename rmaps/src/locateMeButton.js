const LocateMeButton = (onClick) => {
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

    if (onClick) {
        locateMeButton.addEventListener('click', () => {
            onClick();
        });
    }

    return locateMeDiv;
}

export default LocateMeButton;