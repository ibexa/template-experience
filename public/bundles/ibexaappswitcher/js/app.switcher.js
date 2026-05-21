import { QntmAppSwitcher } from '@ibexa-headless-assets/src/bundle/Resources/public/vendors/qntm-app-switcher';

import * as customStyles from '../scss/app-switcher.scss?modules';

(function (global, doc, React, ReactDOMClient) {
    const appSwitcherNode = document.getElementById('qntm-app-switcher');

    if (!appSwitcherNode) {
        return;
    }

    const appSwitcherRoot = ReactDOMClient.createRoot(appSwitcherNode);

    appSwitcherRoot.render(
        React.createElement(QntmAppSwitcher, {
            partnersConfig: {
                Ibexa: { shouldHide: true },
            },
            hideCloseButton: true,
            customStyles,
        }),
    );
})(window, window.document, window.React, window.ReactDOMClient);
