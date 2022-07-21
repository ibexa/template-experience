import { fileSizeToString } from '@ibexa-admin-ui/src/bundle/ui-dev/src/modules/multi-file-upload/helpers/text.helper';

(function (global, doc, ibexa) {
    const modal = doc.querySelector('.ibexa-ca-invite-members');

    if (!modal) {
        return;
    }

    const addNextBtn = doc.querySelector('.ibexa-ca-invite-members__add-next-btn');
    const entriesContainer = doc.querySelector('.ibexa-ca-invite-members__entries');
    const entryPrototype = entriesContainer.dataset.prototype;
    const fileUploadMessage = doc.querySelector('.ibexa-ca-invite-members__upload-file-message');
    const dropZone = doc.querySelector('.ibexa-ca-invite-members__drop');
    const uploadLocalFileBtn = doc.querySelector('.ibexa-ca-invite-members__file-select');
    const fileInput = doc.querySelector('.ibexa-ca-invite-members__file-input');
    const uploadedFileNode = doc.querySelector('.ibexa-ca-invite-members__uploaded-file');
    const uploadedItemNameNode = uploadedFileNode.querySelector('.ibexa-ca-invite-members__uploaded-item-name');
    const uploadedItemSizeNode = uploadedFileNode.querySelector('.ibexa-ca-invite-members__uploaded-item-size');
    const uploadedFileDeleteBtn = uploadedFileNode.querySelector('.ibexa-ca-invite-members__uploaded-item-delete-btn');
    const initialEntries = entriesContainer.querySelectorAll('.ibexa-ca-invite-members__entry');
    let entryCounter = doc.querySelectorAll('.ibexa-ca-invite-members__entry').length;
    const addEntry = (isFileRelated = false, email = '', role = null) => {
        const entryPrototypeRendered = entryPrototype.replaceAll('__name__', entryCounter);

        entryCounter = entryCounter + 1;
        entriesContainer.insertAdjacentHTML('beforeend', entryPrototypeRendered);

        const insertedEntry = entriesContainer.querySelector(':scope > :last-child');
        const emailInput = insertedEntry.querySelector('.ibexa-ca-invite-members__entry-email');
        const dropdownContainer = insertedEntry.querySelector('.ibexa-dropdown');
        const dropdown = new ibexa.core.Dropdown({
            container: dropdownContainer,
        });

        dropdown.init();

        if (role) {
            dropdown.selectOption(role);
        }

        emailInput.value = email;
        attachEntryListeners(insertedEntry);

        if (isFileRelated) {
            insertedEntry.classList.add('ibexa-ca-invite-members__entry--file-related');
        }
    };
    const deleteEntry = (entry, isForceRemove = false) => {
        const entryNodes = entriesContainer.querySelectorAll('.ibexa-ca-invite-members__entry');
        const isLastEntry = entryNodes.length === 1;

        if (isLastEntry && !isForceRemove) {
            const emailInput = entry.querySelector('.ibexa-ca-invite-members__entry-email');
            const dropdownNode = entry.querySelector('.ibexa-dropdown');
            const dropdown = ibexa.helpers.objectInstances.getInstance(dropdownNode);

            emailInput.value = null;
            dropdown.selectFirstOption();
        } else {
            entry.remove();
        }
    };
    const deleteTrailingEntriesIfEmpty = () => {
        const lastEntry = entriesContainer.querySelector(':scope > :last-child');

        if (!lastEntry) {
            return;
        }

        const emailInput = lastEntry.querySelector('.ibexa-ca-invite-members__entry-email');
        const dropdownNode = lastEntry.querySelector('.ibexa-dropdown');
        const dropdown = ibexa.helpers.objectInstances.getInstance(dropdownNode);
        const dropdownSelectedOption = dropdown.getSelectedItems()[0];
        const dropdownFirstOption = dropdownNode.querySelector('.ibexa-dropdown__source option');

        if (!emailInput.value && dropdownSelectedOption === dropdownFirstOption) {
            deleteEntry(lastEntry, true);
            deleteTrailingEntriesIfEmpty();
        }
    };
    const handleEntryAdd = () => {
        addEntry();
    };
    const handleEntryDelete = (event) => {
        const deleteBtn = event.currentTarget;
        const entry = deleteBtn.closest('.ibexa-ca-invite-members__entry');

        deleteEntry(entry);
    };
    const attachEntryListeners = (entry) => {
        const deleteEntryBtn = entry.querySelector('.ibexa-ca-invite-members__entry-delete-btn');

        deleteEntryBtn.addEventListener('click', handleEntryDelete, false);
    };
    const handleFileDelete = () => {
        const fileRelatedEntries = entriesContainer.querySelectorAll('.ibexa-ca-invite-members__entry--file-related');
        const entriesCount = entriesContainer.children.length;
        const areAllEntriesFileRelated = fileRelatedEntries.length === entriesCount;

        fileRelatedEntries.forEach((entry) => deleteEntry(entry));
        toggleUpload(false);
        toggleUploadedFileInfo(true);

        if (areAllEntriesFileRelated) {
            addEntry();
        }
    };
    const toggleUpload = (isForceHide) => {
        fileUploadMessage.classList.toggle('ibexa-ca-invite-members__upload-file-message--hidden', isForceHide);
        dropZone.classList.toggle('ibexa-ca-invite-members__drop--hidden', isForceHide);
    };
    const toggleUploadedFileInfo = (isForceHide) => {
        uploadedFileNode.classList.toggle('ibexa-ca-invite-members__uploaded-file--hidden', isForceHide);
    };
    const setUploadedFileData = (name, size) => {
        uploadedItemNameNode.innerText = name;
        uploadedItemSizeNode.innerText = fileSizeToString(size);
    };
    const clearForm = () => {
        const entries = entriesContainer.querySelectorAll('.ibexa-ca-invite-members__entry');

        entries.forEach((entry) => deleteEntry(entry));
        toggleUpload(false);
        toggleUploadedFileInfo(true);
    };
    const preventDefaultAction = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };
    const handleInvitationFile = (file) => {
        setUploadedFileData(file.name, file.size);
        toggleUpload(true);
        toggleUploadedFileInfo(false);
        processCSVInvitationFile(file).then((invitationData) => {
            deleteTrailingEntriesIfEmpty();
            invitationData.forEach(([email, role]) => {
                addEntry(true, email, role);
            });
        });
    };
    const handleInputUpload = (event) => {
        preventDefaultAction(event);

        const file = fileInput.files[0];

        if (file) {
            handleInvitationFile(file);
        }
    };
    const handleDropUpload = (event) => {
        preventDefaultAction(event);

        const file = event.dataTransfer.files[0];

        if (file) {
            handleInvitationFile(file);
        }
    };
    const processCSVInvitationFile = (file) => {
        return file.text().then((text) => {
            const lineRegexp = /^([^;\r\n]+);([^;\r\n]+)$/gm;
            const matchedData = [...text.matchAll(lineRegexp)];
            const invitationData = matchedData.map(([, email, role]) => [email, role]);

            return invitationData;
        });
    };

    initialEntries.forEach(attachEntryListeners);

    modal.addEventListener('shown.bs.modal', function () {
        window.addEventListener('drop', preventDefaultAction, false);
        window.addEventListener('dragover', preventDefaultAction, false);
    });

    modal.addEventListener('hidden.bs.modal', function () {
        window.removeEventListener('drop', preventDefaultAction, false);
        window.removeEventListener('dragover', preventDefaultAction, false);
        clearForm();
    });

    addNextBtn.addEventListener('click', handleEntryAdd, false);

    dropZone.addEventListener('drop', handleDropUpload, false);
    uploadLocalFileBtn.addEventListener(
        'click',
        (event) => {
            event.preventDefault();
            fileInput.value = '';
            fileInput.click();
        },
        false,
    );
    fileInput.addEventListener('change', handleInputUpload, false);
    uploadedFileDeleteBtn.addEventListener('click', handleFileDelete, false);
})(window, window.document, window.ibexa);
