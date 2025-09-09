(function (doc) {
    const scenarioForm = doc.querySelector('.ibexa-perso-scenarios-list__period-form');
    const periodSelect = doc.querySelector('.ibexa-perso-scenarios-list__period-form-select');

    if (periodSelect) {
        periodSelect.addEventListener(
            'change',
            () => {
                const dateIntervalInput = scenarioForm.querySelector('input[name="scenario-form[period][date_interval]"]');

                dateIntervalInput.value = event.currentTarget.value;
                scenarioForm.submit();
            },
            false,
        );
    }
})(window.document);
