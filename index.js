const fs = require("fs").promises;
const { structureMap } = require("./format-response/geo");
const {
    getMessage,
    waitForResponseMessage,
} = require("./api/fetchMessageFromOpenAi");
const { getMapPrompts } = require("./includes/map_prompts");
const prompts = require("./prompt");

const currencies = ["Lviv", "Vinnitsa", "Kyiv", "Odessa", "Dnept"];

const callbackPrompts = getMapPrompts(structureMap, prompts);

async function generateDescriptions() {
    const currencyPosts = {};

    for (const currency of currencies) {
        if (!currencyPosts[currency]) {
            currencyPosts[currency] = {};
        }

        for (const [key, callback] of Object.entries(callbackPrompts)) {
            console.log(key);
            const structureJson = structureMap[key];
            if (!structureJson) {
                console.error(`No structure defined for key: ${key}`);
                continue;
            }

            try {
                const stream = await getMessage(
                    callback(currency),
                    currency,
                    structureJson
                );
                const response = await waitForResponseMessage(stream);
                console.log(response);

                currencyPosts[currency][key] = { ...JSON.parse(response) };
            } catch (error) {
                console.log(
                    `Error fetching data for ${currency} ${key}:`,
                    error
                );
            }
        }
    }

    return currencyPosts;
}

generateDescriptions().then((allPosts) => {
    const postsFilePath = "geo.json";
    fs.writeFile(postsFilePath, JSON.stringify({ allPosts }, null, 2), "utf8");
    console.log("All posts: ", JSON.stringify(allPosts, null, 2));
});
