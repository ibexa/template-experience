(function (global, doc) {
    const colorAttributesInput = doc.querySelectorAll('.ibexa-attribute-edit--color .ibexa-input');
    const setColorAttributeLabelValue = ({ currentTarget }) => {
        const colorValue = currentTarget.value;
        const attributeNode = currentTarget.closest('.ibexa-attribute-edit--color');
        const colorHexValueNode = attributeNode.querySelector('.ibexa-attribute-edit__hex-value');

        colorHexValueNode.innerHTML = colorValue;
    };

    colorAttributesInput.forEach((colorAttributeInput) => {
        colorAttributeInput.addEventListener('input', setColorAttributeLabelValue, false);
    });
})(window, window.document);
