export const getAllChildren = ({ data, getSubitems, condition }) => {
    const output = [];
    const getAllChildrenHelper = (items = []) => {
        items.forEach((item) => {
            if (condition === undefined || condition(item)) {
                output.push(item);
            }

            getAllChildrenHelper(getSubitems(item));
        });
    };

    getAllChildrenHelper([data]);

    return output;
};
