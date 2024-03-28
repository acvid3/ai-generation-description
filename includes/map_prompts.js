const getMapPrompts = (structureMap, prompts) =>
    Object.keys(structureMap).reduce((acc, key, index) => {
        const callbackKey = Object.keys(prompts)[index];
        if (callbackKey) {
            acc[key] = prompts[callbackKey];
        }
        return acc;
    }, {});

module.exports = { getMapPrompts };
