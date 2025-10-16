(function (global, doc, ibexa, Translator) {
    class RescheduleBtn extends ibexa.dateBasedPublisher.scheduling.BaseScheduleBtn {
        getBulkRequestOperation(contentId, version, publicationTimestamp) {
            return {
                uri: `api/datebasedpublisher/v1/content/objects/${contentId}/versions/${version}/schedule/${publicationTimestamp}`,
                method: 'PATCH',
            };
        }

        getFailNotificationMessage(failedCount, successCount) {
            return Translator.trans(
                /*@Desc("%failedCount% out of %totalCount% selected drafts could not be rescheduled. Please try again.")*/ 'reschedule.fail.message',
                {
                    failedCount,
                    totalCount: failedCount + successCount,
                },
                'ibexa_scheduler',
            );
        }

        getSuccessNotificationMessage() {
            return Translator.trans(/*@Desc("Rescheduled all drafts.")*/ 'reschedule.success.message', {}, 'ibexa_scheduler');
        }

        getErrorNotificationMessage() {
            return Translator.trans(
                /*@Desc("An unexpected error occurred while rescheduling the selected draft(s). Please try again.")*/ 'reschedule.error.message',
                {},
                'ibexa_scheduler',
            );
        }

        prepareModal() {
            super.prepareModal();

            this.schedulingModal.toggleConfirmBtn(true);
            this.schedulingModal.togglePublicationDateInput(true);
            this.schedulingModal.toggleDiscardBtn(false);
        }
    }

    ibexa.addConfig('dateBasedPublisher.scheduling.RescheduleBtn', RescheduleBtn);
})(window, window.document, window.ibexa, window.Translator);
