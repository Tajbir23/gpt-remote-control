/**
 * Active browsers store
 */

const activeBrowsers = new Map();

const add = (browserId, browserData) => {
    activeBrowsers.set(browserId, browserData);
};

const get = (browserId) => {
    return activeBrowsers.get(browserId);
};

const has = (browserId) => {
    return activeBrowsers.has(browserId);
};

const remove = (browserId) => {
    return activeBrowsers.delete(browserId);
};

module.exports = { add, get, has, remove };
