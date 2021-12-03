import { handleRequestResponse } from '../../../../../../../../../ibexa/admin-ui/src/bundle/ui-dev/src/modules/common/helpers/request.helper';
import { showErrorNotification } from '../../../../../../../../../ibexa/admin-ui/src/bundle/ui-dev/src/modules/common/services/notification.service';

export const loadTreeRoot = ({ taxonomyName }) => {
    const loadTreeRootUrl = window.Routing.generate(
        'ibexa.taxonomy.tree.root',
        { taxonomyName },
        true,
    );
    const request = new Request(loadTreeRootUrl, {
        method: 'GET',
        mode: 'same-origin',
        credentials: 'same-origin',
    });

    return fetch(request)
        .then(handleRequestResponse)
        .catch(showErrorNotification);
};
export const loadTree = ({ taxonomyName, entryIds }) => {
    const loadTreeUrl = window.Routing.generate(
        'ibexa.taxonomy.tree.subtree',
        { taxonomyName, entryIds },
        true,
    );
    const request = new Request(loadTreeUrl, {
        method: 'GET',
        mode: 'same-origin',
        credentials: 'same-origin',
    });

    return fetch(request)
        .then(handleRequestResponse)
        .catch(showErrorNotification);
};

export const loadSubtree = ({ taxonomyName, entryId }) => {
    const loadSubtreeUrl = window.Routing.generate(
        'ibexa.taxonomy.tree.nodes',
        { taxonomyName, entryId },
        true,
    );
    const request = new Request(loadSubtreeUrl, {
        method: 'GET',
        mode: 'same-origin',
        credentials: 'same-origin',
    });

    return fetch(request)
        .then(handleRequestResponse)
        .catch(showErrorNotification);
};
