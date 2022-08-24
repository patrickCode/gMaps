const CreateLocateMeButton = (onClick) => {
    var locateMeDiv = document.createElement('div');

    // Set CSS for the control border
    var locateMeButton = document.createElement('div');
    locateMeButton.style.backgroundColor = '#fff';
    locateMeButton.style.border = '2px solid #fff';
    locateMeButton.style.cursor = 'pointer';
    locateMeButton.style.marginBottom = '22px';
    locateMeButton.style.textAlign = 'center';
    locateMeButton.title = 'Click to recenter the map';
    locateMeDiv.appendChild(locateMeButton);

    // Set CSS for the control interior
    var locateMeText = document.createElement('div');
    locateMeText.style.color = 'rgb(25,25,25)';
    locateMeText.style.fontFamily = 'Roboto,Arial,sans-serif';
    locateMeText.style.fontSize = '16px';
    locateMeText.style.lineHeight = '38px';
    locateMeText.style.paddingLeft = '5px';
    locateMeText.style.paddingRight = '5px';
    locateMeText.innerHTML = '<h3>Locate Me</h3>';
    locateMeButton.appendChild(locateMeText);

    if (onClick) {
        locateMeButton.addEventListener('click', () => {
            onClick();
        });
    }

    return locateMeDiv;
}

export default CreateLocateMeButton;