(function (global, doc, ibexa, Translator) {
    class UnscheduleBtn extends ibexa.dateBasedPublisher.scheduling.BaseScheduleBtn {
        getBulkRequestOperation(contentId, version) {
            return {
                uri: `api/datebasedpublisher/v1/content/objects/${contentId}/versions/${version}`,
                method: 'DELETE',
            };
        }

        getFailNotificationMessage(failedCount, successCount) {
            return Translator.trans(
                /*@Desc("%failedCount% out of %totalCount% selected publication dates could not be removed. Please try again.")*/ 'unschedule.fail.message',
                {
                    failedCount,
                    totalCount: failedCount + successCount,
                },
                'ibexa_scheduler',
            );
        }

        getSuccessNotificationMessage() {
            return Translator.trans(
                /*@Desc("Removed all selected publication dates.")*/ 'unschedule.success.message',
                {},
                'ibexa_scheduler',
            );
        }

        getErrorNotificationMessage() {
            return Translator.trans(
                /*@Desc("An error occurred while removing the selected publication dates. Please try again.")*/ 'unschedule.error.message',
                {},
                'ibexa_scheduler',
            );
        }

        prepareModal() {
            super.prepareModal();

            this.schedulingModal.toggleConfirmBtn(false);
            this.schedulingModal.togglePublicationDateInput(false);
            this.schedulingModal.toggleDiscardBtn(true);
        }
    }

    ibexa.addConfig('dateBasedPublisher.scheduling.UnscheduleBtn', UnscheduleBtn);
})(window, window.document, window.ibexa, window.Translator);
