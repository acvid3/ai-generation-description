const OpenAI = require("openai");
require("dotenv").config();
const { getInstructionCryptoCurrency } = require("../instruction");
const { getCurrentPrice } = require("../api/fetchPriceForCurrency");

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
});

const getMessage = async (prompt, currency, structureJson) => {
    const response = await getCurrentPrice(currency);

    const instruction = getInstructionCryptoCurrency(
        response,
        currency,
        JSON.stringify(structureJson, null, 2)
    );

    const stream = await openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
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

module.exports = { getMessage, waitForResponseMessage };
