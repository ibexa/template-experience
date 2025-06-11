(function (global, doc, Routing) {
    const versionA = doc.querySelector('#version_comparison_version_a_version_info');
    const versionB = doc.querySelector('#version_comparison_version_b_version_info');

    if (!versionA || !versionB) {
        return;
    }

    const comparisonButton = doc.querySelector('#version_comparison_compare');
    const sideBySideButton = doc.querySelector('#version_comparison_side_by_side');
    const languageSelect = doc.querySelector('#version_comparison_language');
    const loadVersion = () => {
        if (comparisonButton.classList.contains('ibexa-version-compare-menu__type-selector--active')) {
            redirectToComparison();

            return;
        }

        redirectToSideBySide();
    };
    const getRouteData = () => {
        const contentInfoId = doc.querySelector('.ibexa-version-compare').dataset.contentId;
        const { versionNo: versionNoA, versionLanguageCode: versionALanguageCode } = versionA.options[versionA.selectedIndex].dataset;
        const { versionNo: versionNoB, versionLanguageCode: versionBLanguageCode } = versionB.options[versionB.selectedIndex].dataset;
        const language = languageSelect.options[languageSelect.selectedIndex].value;
        const routeData = {
            contentInfoId,
            versionNoA,
            versionALanguageCode,
        };

        if (language) {
            routeData.languageCode = language;
        }

        if (versionNoB) {
            routeData.versionNoB = versionNoB;
        }

        if (versionBLanguageCode) {
            routeData.versionBLanguageCode = versionBLanguageCode;
        }

        return routeData;
    };
    const redirectToSideBySide = () => {
        const routeData = getRouteData();

        global.location.href = Routing.generate('ibexa.version.compare.split', routeData);
    };
    const redirectToComparison = () => {
        const routeData = getRouteData();

        global.location.href = Routing.generate('ibexa.version.compare.unified', routeData);
    };

    versionA.addEventListener('change', loadVersion);
    versionB.addEventListener('change', loadVersion);
    languageSelect.addEventListener('change', loadVersion);
    comparisonButton.addEventListener('click', redirectToComparison);
    sideBySideButton.addEventListener('click', redirectToSideBySide);
})(window, window.document, window.Routing);
