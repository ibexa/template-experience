(function (global, location) {
    const emdedItemsUpdateChannel = new BroadcastChannel('ibexa-emded-item-live-update');
    const queryString = location.search;
    const urlParams = new URLSearchParams(queryString);
    const updatedContentId = urlParams.get('updatedContentId');

    if (updatedContentId) {
        emdedItemsUpdateChannel.postMessage({ contentId: updatedContentId });
    }
})(window, window.location);
