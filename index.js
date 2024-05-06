const fs = require("fs").promises;
const { structureMap } = require("./format-response");
const {
    getMessage,
    waitForResponseMessage,
} = require("./api/fetchMessageFromOpenAi");
const { getPromptTitle, getPromptContents } = require("./prompt");
const {currencyToCashInGeo, cityMaps} = require("./geo-maps");
const { fiatToCurrency } = require("./fiatToCurrency");
const { fetch } = require("openai/_shims");

async function generateDescriptions() {
    const currencyPosts = {};
    const [title, items] = Object.values(structureMap);

    for (const value of fiatToCurrency) {
        const rout = value;
        const [fiat, currency, geo] = value.split(/-to-|-in-/);

        if (!currencyPosts[rout]) {
            currencyPosts[rout] = {};
        }

        currencyPosts[rout]['items'] = [];

        try {
            const stream = await getMessage(
                getPromptTitle(fiat.replace("CASH", "CASH "), currency, cityMaps[geo]),
                value,
                title 
            );

            const response = await waitForResponseMessage(stream);
            console.log('response:', response);

            currencyPosts[rout]['title'] = { ...JSON.parse(response) };
        } catch (error) {
            console.log(
                `Error fetching data for ${value}:`,
                error
            );
        }

        for (const iterator in items) {
            const prompt = getPromptContents(fiat.replace("CASH", "Cash exchange "), currency, cityMaps[geo])[iterator];

            try {
                const stream = await getMessage(
                    prompt,
                    value,
                    items[iterator]
                );

                const response = await waitForResponseMessage(stream);
                currencyPosts[rout]['items'].push(JSON.parse(response));
                console.log(response);
            } catch (error) {
                console.log(
                    `Error fetching data for ${value}:`,
                    error
                );
            }
        }
    }

    return currencyPosts;
}

generateDescriptions().then((allPosts) => {
    const version = Date.now();
    const postsFilePath = `exchange-fiat-to-currency-in-geo-${version}.json`;
    fs.writeFile(postsFilePath, JSON.stringify({ allPosts }, null, 2), "utf8");
    console.log("All posts: ", JSON.stringify(allPosts, null, 2));
});


