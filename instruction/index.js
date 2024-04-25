const getInstructionCryptoCurrency = (price, currency, structureJson) => {
    let descriptionInstruction = "";
    let priceInstruction = "";
    let answerInstruction = "";
    let itemsInstruction = "";
    let titleInstruction = "";
    let linkInstruction = "";

    if (JSON.stringify(structureJson).includes("description")) {
        descriptionInstruction = `
            Generate a comprehensive description that encapsulates the key features and aspects of the subject. 
            The description should be detailed and informative, with a minimum word count of 200 words and not exceeding 250 words. 
            Focus on clarity and relevance, ensuring the text provides a thorough overview within the specified word limit."
        `;
        priceInstruction = `If there is a currency prise or rate in the prompt, use the ${currency} ${price};`;
    }

    if (JSON.stringify(structureJson).includes("answer")) {
        answerInstruction = `Generate detailed answers for the provided FAQ questions. 
        Each answer should be concise yet informative, covering key points relevant to the question. 
        Structure the output as a series of question-and-answer pairs, with each answer reflecting accurate and up-to-date information related to the question topic. 
        Ensure clarity and precision in the responses to enhance understanding and provide value to the reader.`;
    }

    if (JSON.stringify(structureJson).includes("items")) {
        itemsInstruction = `Please generate a list in the 'items' section containing at least four items. Each item should be detailed and clearly distinct from the others. Ensure that the items are relevant to the context or theme provided.
        `;
    }

    if (JSON.stringify(structureJson).includes("title")) {
        titleInstruction = `Please ensure to provide a title for the response. The title should be concise and accurately reflect the main topic or theme of the content you generate.`;
    }

    


    return `
    
    ${answerInstruction}
    ${priceInstruction}
    ${descriptionInstruction}
    ${itemsInstruction}
    ${titleInstruction}
    (title : static);
    
    ([UA, US, RU] mandatory for lenguages version);

    Whenever a text contains an 'http' or 'https' URL, encapsulate the URL within an anchor tag (<a></a>). 
    Ensure that each link is correctly formatted as an HTML hyperlink, making the URLs clickable and accessible in the generated output. 
    This should be applied consistently throughout the text to enhance usability and navigation."


    The response should be in JSON format, filling in each key of the following structure: ${structureJson}
`;
};

module.exports = {
    getInstructionCryptoCurrency,
};
