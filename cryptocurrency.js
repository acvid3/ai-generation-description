require("dotenv").config();
const fs = require("fs").promises;
const OpenAI = require("openai");
const prompts = require("./prompt");
const { request } = require("http");
const { getInstructionCryptoCurrency } = require("./instruction");

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
});

const currencies = ["BTC", "ETH", "XRP"];

async function getCurrentPrice(currency) {
    const url = `https://www.binance.com/api/v3/depth?symbol=${currency}USDT&limit=1`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        return parseFloat(data.bids[0][0]).toFixed(2);
    } catch (error) {
        console.error(`Error fetching price for ${currency}:`, error);
        return null;
    }
}

const getMessage = async (prompt, currency, structureJson) => {
    const response = await getCurrentPrice(currency);

    const instruction = getInstructionCryptoCurrency(
        response,
        currency,
        JSON.stringify(structureJson, null, 2)
    );

    const stream = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-0125",
        messages: [
            {
                role: "system",
                content: instruction,
            },
            {
                role: "user",
                content: prompt,
            },
        ],
        stream: true,
        response_format: { type: "json_object" },
        temperature: 1,
    });

    await new Promise((resolve) => setTimeout(resolve, 10000));

    return stream;
};

const waitForResponseMessage = async (stream) => {
    let response = "";
    for await (const chunk of stream) {
        response += chunk.choices[0]?.delta?.content || "";
    }

    return response;
};

const structureMap = {
    rate: {
        UA: { title: "" },
        US: { title: "" },
        RU: { title: "" },
    },
    how_to_currency: {
        UA: { title: "", description: "" },
        US: { title: "", description: "" },
        RU: { title: "", description: "" },
    },
    currency_exchange_rates: {
        UA: { title: "", description: "" },
        US: { title: "", description: "" },
        RU: { title: "", description: "" },
    },
    how_does_currency_work: {
        UA: { title: "", items: [{ title: "", description: "" }] },
        US: { title: "", items: [{ title: "", description: "" }] },
        RU: { title: "", items: [{ title: "", description: "" }] },
    },
    where_exchanged: {
        UA: { title: "", description: "" },
        US: { title: "", description: "" },
        RU: { title: "", description: "" },
    },
    store_exchange: {
        UA: { title: "", description: "" },
        US: { title: "", description: "" },
        RU: { title: "", description: "" },
    },
    faq: {
        UA: {
            items: [{ question: "", answer: "" }],
        },
        US: {
            items: [{ question: "", answer: "" }],
        },
        RU: {
            items: [{ question: "", answer: "" }],
        },
    },
};

const callbackPrompts = Object.keys(structureMap).reduce((acc, key, index) => {
    const callbackKey = Object.keys(prompts)[index];
    if (callbackKey) {
        acc[key] = prompts[callbackKey];
    }
    return acc;
}, {});

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
    const postsFilePath = "posts-currency.json";
    fs.writeFile(postsFilePath, JSON.stringify({ allPosts }, null, 2), "utf8");
    console.log("All posts: ", JSON.stringify(allPosts, null, 2));
});
