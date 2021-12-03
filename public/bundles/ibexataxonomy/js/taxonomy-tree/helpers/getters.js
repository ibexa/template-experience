export const getContentLink = (item) => {
    const locationHref = window.Routing.generate('_ez_content_view', {
        contentId: item.contentId,
    });

    return locationHref;
};

export const getEntryId = (item) => item.id;

export const getSubitems = (item) => item.__children;

export const getTotal = (item) => item.totalChildrenCount;
