import { UserInvitationModal } from '@ibexa-admin-ui/src/bundle/Resources/public/js/scripts/user.invitation.modal';

(function (global, doc, ibexa) {
    const modal = doc.querySelector('.ibexa-ca-invite-members');

    if (!modal) {
        return;
    }

    class UserGroupInvitationModal extends UserInvitationModal {
        processCSVInvitationFile(file) {
            return file.text().then((text) => {
                const lineRegexp = /^([^;\r\n]+);([^;\r\n]+)$/gm;
                const matchedData = [...text.matchAll(lineRegexp)];
                const invitationsData = matchedData.map(([, email, role]) => ({ email, role }));

                return invitationsData;
            });
        }

        resetEntry(entry) {
            super.resetEntry(entry);

            const emailInput = entry.querySelector('.ibexa-ca-invite-members__entry-email');
            const dropdownNode = entry.querySelector('.ibexa-dropdown');
            const dropdownOptionsCount = dropdownNode.querySelectorAll('.ibexa-input--select option').length;
            const dropdown = ibexa.helpers.objectInstances.getInstance(dropdownNode);

            emailInput.value = null;

            if (dropdownOptionsCount > 0) {
                dropdown.selectFirstOption();
            }
        }

        isEntryEmpty(entry) {
            const emailInput = entry.querySelector('.ibexa-ca-invite-members__entry-email');
            const dropdownNode = entry.querySelector('.ibexa-dropdown');
            const dropdown = ibexa.helpers.objectInstances.getInstance(dropdownNode);
            const dropdownSelectedOption = dropdown.getSelectedItems()[0];
            const dropdownFirstOption = dropdownNode.querySelector('.ibexa-dropdown__source option');

            return !emailInput.value && dropdownSelectedOption === dropdownFirstOption;
        }

        addEntry(isFileRelated = false, invitationData = null) {
            const addEntryData = super.addEntry(isFileRelated, invitationData);
            const { insertedEntry } = addEntryData;

            const email = invitationData?.email ?? null;
            const role = invitationData?.role ?? null;
            const emailInput = insertedEntry.querySelector('.ibexa-ca-invite-members__entry-email');
            const dropdownContainer = insertedEntry.querySelector('.ibexa-dropdown');
            const dropdown = new ibexa.core.Dropdown({
                container: dropdownContainer,
            });

            dropdown.init();

            const optionToSelect = role ? dropdownContainer.querySelector(`.ibexa-dropdown__item[data-value="${role}"`) : null;

            if (optionToSelect) {
                dropdown.selectOption(role);
            }

            emailInput.value = email;

            return addEntryData;
        }

        checkEntryMatchesSearch(entry, searchText) {
            const emailInput = entry.querySelector('.ibexa-ca-invite-members__entry-email');
            const email = emailInput.value;

            return email.includes(searchText);
        }

        checkIsEntryDuplicate(invitationData, entryToCompare) {
            const entryToCompareEmailInput = entryToCompare.querySelector('.ibexa-ca-invite-members__entry-email');

            return invitationData.email === entryToCompareEmailInput.value;
        }
    }

    const userInvitationModal = new UserGroupInvitationModal({ modal });

    userInvitationModal.init();
})(window, window.document, window.ibexa);
