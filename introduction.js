const { OpenAI } = require("openai");

require("dotenv").config();

const STRUCTURE_RESPONSE = `{
    "UA": {
        "title": "",
        "paragraph": "",
        "content": {
            "title": "",
            "description": ""
        }
    },
    "US": {
        "title": "",
        "paragraph": "",
        "content": {
            "title": "",
            "description": ""
        }
    },
    "RU": {
        "title": "",
        "paragraph": "",
        "content": {
            "title": "",
            "description": ""
        }
    }
}`;

const CURRENCY_FROM = "BTC";
const CURRENCY_TO = "UAH";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const assistantId = process.env.ID_BOT;
console.log("Using Assistant ID:", assistantId);

async function sendMessageToBot() {
    try {
        const thread = await openai.beta.threads.create();
        const message = await openai.beta.threads.messages.create(thread.id, {
            role: "user",
            content: `валютная пара ${CURRENCY_FROM} ${CURRENCY_TO} Структура ответа должна быть в формате json object ${STRUCTURE_RESPONSE}`,
        });

        const run = await openai.beta.threads.runs.create(thread.id, {
            assistant_id: assistantId,
        });

        let runStatus;
        do {
            runStatus = await openai.beta.threads.runs.retrieve(
                thread.id,
                run.id
            );

            if (runStatus.status !== "completed") {
                await new Promise((resolve) => setTimeout(resolve, 5000));
            }
        } while (runStatus.status === "in_progress");

        if (runStatus.status === "completed") {
            const response = await openai.beta.threads.messages.list(thread.id);

            response.data.forEach((msg) => {
                if (msg.role === "assistant") {
                    console.log("Assistant message:");
                    msg.content.forEach((contentItem) => {
                        if (
                            contentItem.type === "text" &&
                            contentItem.text &&
                            contentItem.text.value
                        ) {
                            console.log(JSON.parse(contentItem.text.value));
                        } else {
                            console.log(
                                "No text content available in this item"
                            );
                        }
                    });
                }

                if (msg.role === "user") {
                    console.log("User message:");
                    msg.content.forEach((contentItem) => {
                        if (
                            contentItem.type === "text" &&
                            contentItem.text &&
                            contentItem.text.value
                        ) {
                            console.log(contentItem.text.value);
                        } else {
                            console.log(
                                "No text content available in this item"
                            );
                        }
                    });
                }
            });
        } else {
            console.error("Run did not complete successfully:", runStatus);
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

sendMessageToBot();
