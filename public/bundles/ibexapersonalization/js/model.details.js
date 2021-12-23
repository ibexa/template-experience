(function(doc) {
    const submodelSelect = doc.querySelector('.ibexa-perso-submodel-select');
    const handleSubmodelChange = (event) => {
        const { value, parentNode } = event.currentTarget;

        parentNode.querySelectorAll('.ibexa-perso-submodel').forEach((node) => {
            const method = node.classList.contains(`ibexa-perso-submodel--${value}`) ? 'remove' : 'add';

            node.classList[method]('d-none');
        });
    };

    if (submodelSelect) {
        submodelSelect.addEventListener('change', handleSubmodelChange, true);
    }
})(window.document);
