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
        const { first_currency, last_currency, city } = req.query;

        console.log(
            `Finding difficulty for ${first_currency}, ${last_currency} in ${city}`
        );

        let response = "";
        const stream = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-0613",
            messages: [
                {
                    role: "user",
                    content: `Створи опис для поста сторінки не більше ніж на 200 слів з акцентом на безпеку та швидкість транзакцій. 
                    ось з якої валюті треба створити обмін ( з ${first_currency} у ${last_currency}) в місті ${city}`,
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
