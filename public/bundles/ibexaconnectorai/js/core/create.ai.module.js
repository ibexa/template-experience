import * as coreModulesMap from './modules.map';

const modulesMap = { ...coreModulesMap };

export const addModule = (module) => {
    modulesMap[module.name] = module;
};

export default (moduleName) => {
    if (!modulesMap[moduleName]) {
        throw new Error(`No module found for identifier "${moduleName}"`);
    }

    return modulesMap[moduleName];
};
