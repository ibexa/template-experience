(function (global, doc, ibexa) {
    global.ibexa = global.ibexa || { modules: {} };

    const CLASS_PREVIEW_ACTION_SELECTED = 'ibexa-btn--selected';
    const CLASS_DROPDOWN_EXPANDED = 'ibexa-dropdown--expanded';
    const CLASS_PREVIEW_EXTRA_ACTIONS_HIDDEN = 'ibexa-extra-actions--hidden';
    const CLASS_WITH_BACKDROP = 'ibexa-with-backdrop';
    const CLASS_DROPDOWN_SWITCHER = 'ibexa-dropdown__switcher';
    const SELECTOR_DROPDOWN = '.ibexa-dropdown';
    const SELECTOR_ICON_CHECKBOX = '.ibexa-checkbox-icon__checkbox';
    const SELECTOR_EXTRA_ACTIONS_EDIT = '.ibexa-extra-actions--page-edit';
    const SELECTOR_EXTRA_ACTIONS_CREATE = '.ibexa-extra-actions--page-create';
    const SELECTOR_EXTRA_ACTIONS_WRAPPER = '.ibexa-page-info-bar__create-content-wrapper';
    const SELECTOR_STANDARD_ACTIONS_WRAPPER = '.ibexa-page-info-bar__actions';
    const PREVIEW_WIDTH_MAP = {
        desktop: '100%',
        tablet: '1280px',
        mobile: '800px',
    };

    global.ibexa.modules.InfoBar = class InfoBar {
        constructor({ containerSelector = '.ibexa-pb-infobar', isCreateMode = false } = {}) {
            this.container = doc.querySelector(containerSelector);
            this.isCreateMode = isCreateMode;
            this.subMenuBackdrop = new ibexa.core.Backdrop();

            this.contentActionSwitcher = this.container.querySelector('.ibexa-pb-action-bar__content-action-switcher');
            this.contentModeSwitcher = this.container.querySelector('.ibexa-pb-action-bar__content-mode-switcher');
            this.previewSwitcher = this.container.querySelector('.ibexa-preview-switcher');
            this.createContentBtnWrapper = this.container.querySelector(SELECTOR_EXTRA_ACTIONS_WRAPPER);
            this.standardActionsWrapper = this.container.querySelector(SELECTOR_STANDARD_ACTIONS_WRAPPER);
            this.editActionsWrapper = this.standardActionsWrapper
                ? this.standardActionsWrapper.querySelector(SELECTOR_EXTRA_ACTIONS_EDIT)
                : null;

            this.contentUrl = this.container.querySelector('.ibexa-pb-content-action-info__url');
            this.contentLanguage = this.container.querySelector('.ibexa-pb-content-action-info__language-name');
            this.contentAuthor = this.container.querySelector('.ibexa-content-details__author');
            this.contentModificationDate = this.container.querySelector('.ibexa-content-details__modified-date');

            if (this.previewSwitcher) {
                this.previewActions = [...this.previewSwitcher.querySelectorAll('.ibexa-preview-switcher__action')];
            }

            if (this.createContentBtnWrapper) {
                this.dropdownSwitcher = this.createContentBtnWrapper.querySelector('.ibexa-dropdown__switcher');
                this.createContentBtn = this.createContentBtnWrapper.querySelector('.ibexa-pb-action-bar__create-content');
            }

            this.redirectToAction = this.redirectToAction.bind(this);
            this.showVersionLanguagePicker = this.showVersionLanguagePicker.bind(this);
            this.hideVersionLanguagePicker = this.hideVersionLanguagePicker.bind(this);
            this.toggleContentMode = this.toggleContentMode.bind(this);
            this.changePreviewMode = this.changePreviewMode.bind(this);
            this.showPreviewExtraActions = this.showPreviewExtraActions.bind(this);
            this.hidePreviewExtraActions = this.hidePreviewExtraActions.bind(this);
            this.toggleEditExtraActions = this.toggleEditExtraActions.bind(this);
            this.showEditExtraActions = this.showEditExtraActions.bind(this);
            this.hideEditExtraActions = this.hideEditExtraActions.bind(this);
            this.removeSubMenuBackdrop = this.removeSubMenuBackdrop.bind(this);
            this.onDraftConflictModalCancel = this.onDraftConflictModalCancel.bind(this);
            this.onVersionLanguagePickerBackdropClick = this.onVersionLanguagePickerBackdropClick.bind(this);

            this.attachEventListeners();
        }

        attachEventListeners() {
            if (!this.isCreateMode && this.contentActionSwitcher) {
                this.contentActionSwitcher.querySelector(SELECTOR_ICON_CHECKBOX).addEventListener('change', this.redirectToAction, false);
            }

            if (this.contentModeSwitcher) {
                this.contentModeSwitcher.querySelector(SELECTOR_ICON_CHECKBOX).addEventListener('change', this.toggleContentMode, false);
            }

            if (this.previewActions) {
                this.previewActions.forEach((action) => action.addEventListener('click', this.changePreviewMode, false));
            }

            if (this.dropdownSwitcher) {
                this.dropdownSwitcher.addEventListener('click', this.toggleEditExtraActions, false);
            }

            if (this.createContentBtn) {
                this.createContentBtn.addEventListener('click', this.showPreviewExtraActions, false);

                const extraActions = this.container.querySelector(SELECTOR_EXTRA_ACTIONS_CREATE);

                if (extraActions) {
                    this.attachSubmitEvent(extraActions);
                }
            }

            doc.body.addEventListener('ibexa-draft-conflict-modal-hidden', this.onDraftConflictModalCancel, false);
        }

        attachSubmitEvent(actions) {
            const form = actions.querySelector('form');
            const radioBtns = [...actions.querySelectorAll('.form-check [type="radio"]')];

            radioBtns.forEach((btn) =>
                btn.addEventListener(
                    'change',
                    () => {
                        form.submit();
                    },
                    false,
                ),
            );
        }

        redirectToAction(event) {
            const { dataset } = event.currentTarget;
            if (this.contentActionSwitcher.classList.contains('disabled')) {
                return;
            }

            this.toggleSwitcherState(this.contentActionSwitcher);

            if (!dataset.urlPreview) {
                this.showVersionLanguagePicker();
            } else {
                global.location.href = dataset.urlPreview;
            }
        }

        addSubMenuBackdrop(eventHandler) {
            if (this.subMenuBackdrop) {
                return;
            }

            this.subMenuBackdrop.addEventListener('click', eventHandler, false);
            this.subMenuBackdrop.show();
        }

        removeSubMenuBackdrop(eventHandler) {
            if (!this.subMenuBackdrop) {
                return;
            }

            this.subMenuBackdrop.hide();
            this.subMenuBackdrop.removeEventListener('click', eventHandler);
        }

        toggleContentMode() {
            this.toggleSwitcherState(this.contentModeSwitcher);

            ibexa.helpers.tooltips.hideAll();
        }

        toggleSwitcherState(switcher) {
            switcher.classList.toggle('is-checked');
        }

        toggleEditActions(show) {
            this.editActionsWrapper.classList.toggle(CLASS_WITH_BACKDROP, show);
            this.editActionsWrapper.classList.toggle(CLASS_PREVIEW_EXTRA_ACTIONS_HIDDEN, !show);
        }

        changePreviewMode(event) {
            this.previewActions.forEach((action) => action.classList.remove(CLASS_PREVIEW_ACTION_SELECTED));

            event.currentTarget.classList.add(CLASS_PREVIEW_ACTION_SELECTED);

            const type = event.currentTarget.dataset.previewMode;

            doc.querySelector('#page-builder-preview').style = `width: ${PREVIEW_WIDTH_MAP[type]};`;
            ibexa.helpers.tooltips.hideAll();
        }

        onDraftConflictModalCancel() {
            this.hideVersionLanguagePicker();
        }

        showVersionLanguagePicker() {
            if (this.editActionsWrapper.classList.contains('ibexa-extra-actions--prevent-show')) {
                const languageRadioOption = this.editActionsWrapper.querySelector('[type="radio"]');

                languageRadioOption.checked = true;
                languageRadioOption.dispatchEvent(new CustomEvent('change'));

                return;
            }

            this.toggleEditActions(true);
            this.addSubMenuBackdrop(this.onVersionLanguagePickerBackdropClick);
        }

        onVersionLanguagePickerBackdropClick({ target }) {
            const wrapper = target.closest(SELECTOR_STANDARD_ACTIONS_WRAPPER);

            if (wrapper) {
                return;
            }

            this.hideVersionLanguagePicker();
        }

        hideVersionLanguagePicker() {
            const switcher = this.contentActionSwitcher.querySelector(SELECTOR_ICON_CHECKBOX);

            this.toggleEditActions(false);
            switcher.checked = false;

            this.toggleSwitcherState(this.contentActionSwitcher);
            this.removeSubMenuBackdrop(this.hidePreviewExtraActions);
        }

        showPreviewExtraActions() {
            const actions = this.createContentBtnWrapper.querySelector(SELECTOR_EXTRA_ACTIONS_CREATE);

            actions.classList.remove(CLASS_PREVIEW_EXTRA_ACTIONS_HIDDEN);
            actions.classList.add(CLASS_WITH_BACKDROP);

            this.addSubMenuBackdrop(this.hidePreviewExtraActions);
        }

        hidePreviewExtraActions({ target }) {
            const wrapper = target.closest(SELECTOR_EXTRA_ACTIONS_WRAPPER);

            if (wrapper) {
                return;
            }

            const actions = this.createContentBtnWrapper.querySelector(SELECTOR_EXTRA_ACTIONS_CREATE);

            actions.classList.add(CLASS_PREVIEW_EXTRA_ACTIONS_HIDDEN);
            actions.classList.remove(CLASS_WITH_BACKDROP);

            this.removeSubMenuBackdrop(this.hidePreviewExtraActions);
        }

        toggleEditExtraActions(event) {
            const isExpanded =
                event.target.classList.contains(CLASS_DROPDOWN_EXPANDED) || event.target.closest(`.${CLASS_DROPDOWN_EXPANDED}`);

            if (isExpanded) {
                this.hideEditExtraActions(event);
            } else {
                this.showEditExtraActions();
            }
        }

        showEditExtraActions() {
            const dropdown = this.createContentBtnWrapper.querySelector(SELECTOR_DROPDOWN);

            dropdown.classList.add(CLASS_DROPDOWN_EXPANDED);
            dropdown.classList.add(CLASS_WITH_BACKDROP);

            this.addSubMenuBackdrop(this.hideEditExtraActions);
        }

        hideEditExtraActions({ target }) {
            const isDropdown = target.classList.contains(CLASS_DROPDOWN_EXPANDED) || target.closest(`.${CLASS_DROPDOWN_EXPANDED}`);
            const isDropdownSwitcher = target.classList.contains(CLASS_DROPDOWN_SWITCHER);

            if (isDropdown && !isDropdownSwitcher) {
                return;
            }

            const dropdown = this.createContentBtnWrapper.querySelector(SELECTOR_DROPDOWN);

            dropdown.classList.remove(CLASS_DROPDOWN_EXPANDED, CLASS_WITH_BACKDROP);
            this.removeSubMenuBackdrop(this.hideEditExtraActions);
        }
    };
})(window, window.document, window.ibexa);
