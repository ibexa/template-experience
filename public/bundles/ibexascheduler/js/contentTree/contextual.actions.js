import { MODULE_ID } from '@ibexa-content-tree/src/bundle/ui-dev/src/modules/content-tree/content.tree.module';

import ScheduleHideContent from '@ibexa-scheduler-modules/content-tree/components/schedule-hide-content/schedule.hide.content';

(function (global, doc, ibexa) {
    const MODIFY_ACTION_ID = 'modifying';
    const HIDE_ACTION_ID = 'hide';
    const getMenuActions = (actions) => {
        const modifyingActions = actions.find((action) => action.id === MODIFY_ACTION_ID);

        if (!modifyingActions) {
            return actions;
        }

        const hideAction = modifyingActions.subitems.find((action) => action.id === HIDE_ACTION_ID);

        if (!hideAction) {
            return actions;
        }

        hideAction.component = ScheduleHideContent;

        return actions;
    };
    const openScheduleHideWidget = (event) => {
        const actions = doc.querySelector(`.ibexa-extra-actions[data-actions="content-tree-hide-schedule"]`);
        const form = actions.querySelector('form[name="content-tree-schedule-hide"]');
        const locationField = form.querySelector('[name="content-tree-schedule-hide[location]"]');
        const contentField = form.querySelector('[name="content-tree-schedule-hide[versionInfo][content_info]"]');
        const versionField = form.querySelector('[name="content-tree-schedule-hide[versionInfo][version_no]"]');
        const { internalItem } = event.detail.item;

        locationField.value = internalItem.locationId;
        contentField.value = internalItem.contentId;
        versionField.value = internalItem.versionNo;
        actions.dataset.modalSelector = internalItem.reverseRelationsCount > 0 ? '#content-tree-hide-content-modal' : '';

        doc.body.dispatchEvent(
            new CustomEvent('ibexa-extra-actions:toggle-widget', {
                detail: {
                    actions: 'content-tree-hide-schedule',
                },
            }),
        );
    };

    doc.body.addEventListener('ibexa-content-tree:schedule-hide', openScheduleHideWidget, false);

    ibexa.addConfig(
        `treeBuilder.${MODULE_ID}.getMenuActions`,
        [
            {
                priority: 200,
                callback: getMenuActions,
            },
        ],
        true,
    );
})(window, window.document, window.ibexa);
