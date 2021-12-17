const findFirstIndex = (items, originalItem, getId) => items.findIndex((item) => getId(item) === getId(originalItem));

export const removeDuplicates = (items, { getId }) => {
    const output = items.filter((item, index) => {
        const firstIndex = findFirstIndex(items, item, getId);

        return firstIndex === index;
    });

    return output;
};
