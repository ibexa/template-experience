(function (global, doc) {
    const selectedTaxonomiesInput = doc.querySelector('.ibexa-update-policy--action .ibexa-dropdown__source .ibexa-input');
    const allTaxonomiesEntries = doc.querySelectorAll('.ibexa-taxonomy-limitation-picker__taxonomy-entry');
    const valueInput = doc.querySelector('.ibexa-taxonomy-limitation-picker__value input[type="hidden"]');
    const getAllValues = () => {
        const values = [...allTaxonomiesEntries].reduce((output, entry) => {
            if (entry.hidden) {
                return output;
            }

            const input = entry.querySelector('input[data-taxonomy]');

            return [...output, ...input.value.split(',')];
        }, []);

        return values.filter((value) => value).join(',');
    };

    selectedTaxonomiesInput.addEventListener('change', (event) => {
        const selectedTaxonomies = [...event.target.selectedOptions].map(({ value }) => value);

        allTaxonomiesEntries.forEach((entry) => {
            entry.hidden = !selectedTaxonomies.includes(entry.dataset.id);
        });
        valueInput.value = getAllValues();
    });

    allTaxonomiesEntries.forEach((entry) => {
        const input = entry.querySelector('input[data-taxonomy]');

        input.addEventListener('change', () => {
            valueInput.value = getAllValues();
        });
    });
})(window, window.document);
