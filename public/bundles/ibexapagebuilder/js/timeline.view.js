(function (global, doc, ibexa, React, ReactDOM) {
    const timelineContainer = doc.querySelector('.ibexa-pb-timeline-wrapper');
    const timelineRoot = ReactDOM.createRoot(timelineContainer);
    const onTimelineEventSelect = (oldTimestamp, newTimestamp, events) => {
        const event = new CustomEvent('ibexa-timestamp-changed', {
            detail: {
                oldTimestamp,
                newTimestamp,
                events,
            },
        });

        doc.body.dispatchEvent(event);
    };
    const refreshPreviewIframe = (event) => {
        const previewUrl = new URL(ibexa.pageBuilder.config.previewUrl);
        const referenceTimestamp = parseInt(event.detail.newTimestamp / 1000, 10);

        previewUrl.searchParams.delete(ibexa.pageBuilder.config.tokenQueryParamName);
        previewUrl.searchParams.append('page_preview[reference_timestamp]', referenceTimestamp);

        doc.querySelector('#page-builder-preview').src = decodeURIComponent(previewUrl.toString());
    };

    timelineRoot.render(
        React.createElement(ibexa.modules.Timeline, {
            onTimelineEventSelect,
            events: ibexa.pageBuilder.timeline.events,
            selectedTimestamp: window.ibexa.pageBuilder.config.referenceTimestamp * 1000,
        }),
    );

    doc.body.addEventListener('ibexa-timestamp-changed', refreshPreviewIframe, false);
})(window, window.document, window.ibexa, window.React, window.ReactDOM);
