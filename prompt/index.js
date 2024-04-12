const getPromptTitle = (currency) => `Static title: Rate ${currency}`;
const getPromptContents = (currency) => [
    `
    What is ${currency}?
    Write text for the section What is ${currency}? Use in the text: exchange rate, chart, price
    `,
    `
    Main exchange rates of ${currency}
    Write text for the section Main exchange rates of ${currency}, use in the text: cost, online rate, on the market
    `,
    `
    How does ${currency} work?
    Write text for the section How does ${currency} work?, use in the text: price, cost, assets Include organically in the test link How to exchange? [https://easy-changer.io/how-to-exchange-cryptocurrency/#how-to]
    `,
    `
    Where can you buy, sell, or exchange ${currency}?
    Write text for the section Where can you buy, sell, or exchange ${currency}?, use in the text: price, cost, assets Include organically in the test link What are the limits for withdrawing cryptocurrency to a card? [https://easy-changer.io/how-to-exchange-cryptocurrency/#limits-for-withdrawing]
    `,
    `
    How to store ${currency}?
    Write text for the section How to store ${currency}?, use in the text: quantity, on the market
    `,
    `
    FAQ: 
    Answer briefly the question: 'What factors influence the price of ${currency}?',
    Answer briefly the question: 'What risks are associated with investing in ${currency}?',
    Answer briefly the question: 'What payment systems and cryptocurrency exchanges support the purchase and sale of ${currency}?',
    Answer briefly the question: 'What steps should be taken to ensure the security of ${currency}?' Include organically in the test link [https://easy-changer.io/safety/],
    Answer briefly the question: 'What are the prospects for the development of ${currency} in the future?'
    `
];

module.exports = {
    getPromptTitle,
    getPromptContents
};