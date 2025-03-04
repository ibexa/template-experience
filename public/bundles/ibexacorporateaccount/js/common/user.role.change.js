(function (global, doc, ibexa, bootstrap) {
    const modal = doc.querySelector('.ibexa-ca-user-role-change-modal');

    if (!modal) {
        return;
    }

    const bootstrapModalInstance = bootstrap.Modal.getOrCreateInstance(modal);
    const userIdInput = modal.querySelector('#member_role_change_member_user');
    const companyIdInput = modal.querySelector('#member_role_change_member_company');
    const roleSelect = modal.querySelector('#member_role_change_new_role');
    const roleDropdownNode = roleSelect.closest('.ibexa-dropdown');
    const roleDropdownInstance = ibexa.helpers.objectInstances.getInstance(roleDropdownNode);
    const userChangeRoleBtns = doc.querySelectorAll('.ibexa-ca-user-change-role-btn');
    const prepareModal = (userId, companyId, currentRoleId) => {
        userIdInput.value = userId;
        companyIdInput.value = companyId;
        roleDropdownInstance.selectOption(currentRoleId);
    };
    const handleUserRoleChange = (event) => {
        const btn = event.currentTarget;
        const { userId, companyId, currentRoleId } = btn.dataset;

        prepareModal(userId, companyId, currentRoleId);
        bootstrapModalInstance.show();
    };

    userChangeRoleBtns.forEach((btn) => btn.addEventListener('click', handleUserRoleChange, false));
})(window, window.document, window.ibexa, window.bootstrap);
