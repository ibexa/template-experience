import { useContext } from 'react';

import { PortalContext } from '../components/portal-provider/portal.provider';

export default (portalId) => {
    const portals = useContext(PortalContext);

    return portals[portalId];
};
