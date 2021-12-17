import { useEffect, useRef } from 'react';

export default (callback, dependencyList) => {
    const firstRender = useRef(true);

    useEffect(() => {
        if (!firstRender.current) {
            callback();
        } else {
            firstRender.current = false;
        }
    }, dependencyList);
};
