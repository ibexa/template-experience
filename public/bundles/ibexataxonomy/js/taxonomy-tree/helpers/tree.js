import { getLastElement } from './array';

export const findItem = (items, originalPath) => {
    const path = [...originalPath];
    const isLast = path.length === 1;
    const item = items.find((element) => element.id === parseInt(path[0], 10));

    if (!item) {
        return null;
    }

    if (isLast) {
        return item;
    }

    if (!Array.isArray(item.__children)) {
        return null;
    }

    path.shift();

    return findItem(item.__children, path);
};

/* we don't have totalSubitems because of performance, we use nested set tree properties */
export const hasSubitems = (item) => item.right - item.left > 1;

const getParentPath = (parents) => {
    if (!parents || parents.length === 0) {
        return '';
    }

    const parent = getLastElement(parents);

    return `${parent.path}/`;
};

export const extendItem = (item, { parents }) => {
    const parentPath = getParentPath(parents);
    let totalChildrenCount = 0;

    if (hasSubitems(item)) {
        if (item.__children.length) {
            totalChildrenCount = item.__children.length;
        } else {
            totalChildrenCount = 1;
        }
    }

    return {
        ...item,
        path: `${parentPath}${item.id}`,
        totalChildrenCount,
    };
};
