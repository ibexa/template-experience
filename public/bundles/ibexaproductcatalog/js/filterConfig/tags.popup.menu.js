const { ibexa } = window;
const CLASS_POPUP_MENU_HIDDEN = 'ibexa-popup-menu--hidden';

class TagsPopupMenu extends ibexa.core.PopupMenu {
    handleClickOutsidePopupMenu(event) {
        const isTriggerElement = event.target.classList.contains('ibexa-pc-edit-catalog-list-filter__tags-toggler-btn');
        const isPopupMenuExpanded = !this.popupMenuElement.classList.contains(CLASS_POPUP_MENU_HIDDEN);
        const isClickInsidePopup = this.popupMenuElement.contains(event.target);

        if (!isPopupMenuExpanded || isTriggerElement) {
            return;
        }

        this.popupMenuElement.classList.toggle(CLASS_POPUP_MENU_HIDDEN, !isClickInsidePopup);
    }

    attachOnClickToItem() {
        return;
    }

    closePopup() {
        this.popupMenuElement.classList.add(CLASS_POPUP_MENU_HIDDEN);
    }
}

export default TagsPopupMenu;
