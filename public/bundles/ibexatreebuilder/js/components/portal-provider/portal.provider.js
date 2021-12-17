import React, { createContext, useEffect, useRef, useContext } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { ModuleIdContext } from '../../tree.builder.module';

export const PortalContext = createContext();

const transformToObject = (array, callback = () => null) =>
    array.reduce(
        (object, id) => ({
            ...object,
            [id]: callback(id),
        }),
        {},
    );

const PortalProvider = ({ children, portals }) => {
    const portalRef = useRef(transformToObject(portals));
    const prevPosition = useRef(transformToObject(portals, () => ({})));
    const moduleId = useContext(ModuleIdContext);
    const renderPortal = (id, portalChildren, getPosition) => {
        const { x, y } = getPosition();

        if (x !== prevPosition.current[id].x || y !== prevPosition.current[id].y) {
            prevPosition.current[id] = { x, y };

            portalRef.current[id].style.left = `${x}px`;
            portalRef.current[id].style.top = `${y}px`;
        }

        return ReactDOM.createPortal(portalChildren, portalRef.current[id]);
    };
    const portalContextValues = transformToObject(portals, (id) => ({
        element: portalRef.current[id],
        renderPortal: renderPortal.bind(null, id),
    }));

    useEffect(() => {
        portals.forEach((portalId) => {
            const portal = window.document.createElement('div');

            portalRef.current[portalId] = portal;

            portal.classList.add('c-tb-portal', `c-tb-portal--${portalId}-${moduleId}`);
            window.document.querySelector('body').insertAdjacentElement('beforeend', portal);
        });

        return () => {
            portals.forEach((portalId) => {
                portalRef.current[portalId].remove();
            });
        };
    }, []);

    return <PortalContext.Provider value={portalContextValues}>{children}</PortalContext.Provider>;
};

PortalProvider.propTypes = {
    children: PropTypes.node.isRequired,
    portals: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default PortalProvider;
