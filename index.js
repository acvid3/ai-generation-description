const express = require("express");
require("dotenv").config();

const OpenAI = require("openai");
const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
});

const app = express();

app.use(express.json());

app.post("/generate-description", async (req, res) => {
    try {
        const { prompt } = req.query;

        console.log(`Finding difficulty for ${prompt}`);

        let response = "";
        const stream = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-0613",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            stream: true,
        });

        for await (const chunk of stream) {
            response += chunk.choices[0]?.delta?.content || "";
        }

        return res.status(200).json({
            success: true,
            data: response,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
                ? error.message
                : "There was an issue on the server",
        });
    }
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}`));
