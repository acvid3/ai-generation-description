const fs = require("fs").promises;
const { structureMap } = require("./format-response");
const {
    getMessage,
    waitForResponseMessage,
} = require("./api/fetchMessageFromOpenAi");
const { getPromptTitle, getPromptContents } = require("./prompt");

const currencies = [
    ["ETH", "UAH", "Zaporizhzhia"],
    ["BTC", "UAH", "Kharkiv"],
    ["XRP", "UAH", "Odesa"],
    ["DOGE", "USD", "Kyiv"],
    ["BNB", "USD", "Dnipro"],
];

async function generateDescriptions() {
    const currencyPosts = {};
    const [title, items] = Object.values(structureMap);

    for (const item of currencies) {
        const [currency, fiat, geo] = item;
        const rout = `${currency}-to-${fiat}-in-${geo}`;
        
        if (!currencyPosts[rout]) {
            currencyPosts[rout] = {};
        }

        currencyPosts[rout]['items'] = [];
        
        try {
            const stream = await getMessage(
                getPromptTitle(currency, fiat, geo),
                item,
                title 
            );

            const response = await waitForResponseMessage(stream);
            console.log(response);

            currencyPosts[rout]['title'] = { ...JSON.parse(response) };
        } catch (error) {
            console.log(
                `Error fetching data for ${item}:`,
                error
            );
        }

        for (const iterator in items) {
            const prompt = getPromptContents(currency, fiat, geo)[iterator];

            try {
                const stream = await getMessage(
                    prompt,
                    item,
                    items[iterator]
                );

                const response = await waitForResponseMessage(stream);
                currencyPosts[rout]['items'].push(JSON.parse(response));
                console.log(response);
            } catch (error) {
                console.log(
                    `Error fetching data for ${item}:`,
                    error
                );
            }
        }
    }

    return currencyPosts;
}

generateDescriptions().then((allPosts) => {
    const postsFilePath = "exchange-currency-with-fiat-in-geo-v1.json";
    fs.writeFile(postsFilePath, JSON.stringify({ allPosts }, null, 2), "utf8");
    console.log("All posts: ", JSON.stringify(allPosts, null, 2));
});
