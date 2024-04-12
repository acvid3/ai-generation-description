const fs = require("fs").promises;
const { structureMap } = require("./format-response");
const {
    getMessage,
    waitForResponseMessage,
} = require("./api/fetchMessageFromOpenAi");
const { getPromptTitle, getPromptContents } = require("./prompt");

const currencies = ["BTC", "BNB", "ETH", "DOGE", "XRP", "USDT TRC20", "USDT ERC20"];

async function generateDescriptions() {
    const currencyPosts = {};
    const [title, items] = Object.values(structureMap);

    for (const currency of currencies) {
        if (!currencyPosts[currency]) {
            currencyPosts[currency] = {};
        }
        currencyPosts[currency]['items'] = [];
        
        try {
            const stream = await getMessage(
                getPromptTitle(currency),
                currency,
                title 
            );

            const response = await waitForResponseMessage(stream);
            console.log(response);

            currencyPosts[currency]['title'] = { ...JSON.parse(response) };
        } catch (error) {
            console.log(
                `Error fetching data for ${currency}:`,
                error
            );
        }

        for (const iterator in items) {
            const prompt = getPromptContents(currency)[iterator];

            try {
                const stream = await getMessage(
                    prompt,
                    currency,
                    items[iterator]
                );

                const response = await waitForResponseMessage(stream);
                currencyPosts[currency]['items'].push(JSON.parse(response));
            } catch (error) {
                console.log(
                    `Error fetching data for ${currency}:`,
                    error
                );
            }
        }
    }

    return currencyPosts;
}

generateDescriptions().then((allPosts) => {
    const postsFilePath = "currency.json";
    fs.writeFile(postsFilePath, JSON.stringify({ allPosts }, null, 2), "utf8");
    console.log("All posts: ", JSON.stringify(allPosts, null, 2));
});
