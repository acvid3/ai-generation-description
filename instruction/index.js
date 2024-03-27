const getInstructionCryptoCurrency = (price, currency, structureJson) => {
    let descriptionInstruction = "";
    let priceInstruction = "";
    let answerInstruction = "";

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

    console.log(answerInstruction);
    return `
    
    ${answerInstruction}
    ${priceInstruction}
    ${descriptionInstruction}
    (title : static);
    (If there is a link in the prompt, wrap it in a tag <a></a>);
    ([UA, US, RU] mandatory for lenguages version);

    The response should be in JSON format, filling in each key of the following structure: ${structureJson}
`;
};

module.exports = {
    getInstructionCryptoCurrency,
};
