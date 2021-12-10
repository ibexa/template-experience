export const isItemDisabled = (originalItem, { parents, selectedData, getId }) => {
    const isDescendant = parents.some((parent) => selectedData.some((item) => getId(item) === getId(parent)));

    return isDescendant;
};

export const isItemEmpty = (item) => (item === null || item === undefined) || Object.keys(item).length === 0;

export const isItemStored = (originalItem, items, { getId }) => items.some((item) => getId(item) === getId(originalItem));
