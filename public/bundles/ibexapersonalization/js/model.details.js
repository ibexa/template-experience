(function(doc) {
    const submodelSelect = doc.querySelector('.ibexa-perso-model-details__submodel-select');
    const handleSubmodelChange = () => {
        const selectedValue = submodelSelect.value;
        const detailsNode = submodelSelect.closest('.ibexa-details');
        const allSubmodelsDetails = detailsNode.querySelectorAll('.ibexa-perso-submodel-details');

        allSubmodelsDetails.forEach((node) => {
            const isSelectedSubmodel = node.classList.contains(`ibexa-perso-submodel-details--${selectedValue}`);

            node.classList.toggle('d-none', !isSelectedSubmodel);
        });
    };

    if (submodelSelect) {
        submodelSelect.addEventListener('change', handleSubmodelChange, true);
    }
})(window.document);
