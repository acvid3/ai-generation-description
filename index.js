require("dotenv").config();
const fs = require("fs").promises;
const OpenAI = require("openai");
const prompts = require("./prompt");

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
});

const currencies = ["BTC", "ETH", "DOGE", "SOL", "XRP"];

const getMessage = async (prompt, structureJson) => {
    const instruction =
        "The response should be in JSON format, filling in each key of the following structure:";
    const content = `${prompt} ${instruction} ${JSON.stringify(
        structureJson,
        null,
        2
    )}`;

    const stream = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
            {
                role: "user",
                content,
            },
        ],
        stream: true,
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
        UA: { title: "", items: [{ question: "", answer: "" }] },
        US: { title: "", items: [{ question: "", answer: "" }] },
        RU: { title: "", items: [{ question: "", answer: "" }] },
    },
};

const callbackPrompts = Object.keys(structureMap).reduce((acc, key, index) => {
    const callbackKey = Object.keys(prompts)[index];
    if (callbackKey) {
        acc[key] = prompts[callbackKey];
    }
    return acc;
}, {});

console.log({ callbackPrompts });

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
