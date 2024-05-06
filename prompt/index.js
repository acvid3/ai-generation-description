const getPromptTitle = (fiat, currency, geo) => `Dont generate! This is static title i need only translate: (Exchange ${fiat} with ${currency} in ${geo})`;
const getPromptContents = (fiat, currency, geo) => [
  `description: Write an intro for the article 'Exchange ${fiat} for ${currency} in ${geo}' without writing the headline. Use words: exchange, sell, transfer, cash, cryptocurrency https://easy-changer.io/how-to-exchange-cryptocurrency/`,
  `title: Easy-Changer simplifies the exchange process of ${fiat} for ${currency} in ${geo} description: Write several paragraphs for the section 'Easy-Changer simplifies the exchange process of ${fiat} for ${currency} in ${geo}'. Include an organic link to the page https://easy-changer.io/how-to-exchange-cryptocurrency/. Use words: method, funds, transactions, cash`,
  `title: Advantages of buying ${currency} for ${fiat} in ${geo} list: Reinterpret the text below with the advantages listed. Example: Fast, Secure, Profitable, Convenient. Use words: cryptocurrency, amount, quantity, reliability`,
  `title: How the exchange happens through Easy-Changer in ${geo} description: Write several paragraphs for the section 'How the exchange happens through Easy-Changer in ${geo}'. Include an organic link to the page https://easy-changer.io/how-to-exchange-cryptocurrency/#limits. Use words: method, funds, transactions, cash`,
  `title: Precautions during transaction processing description: Write several paragraphs for the section 'Precautions during transaction processing'. Include an organic link to the page https://easy-changer.io/safety/. Use words: exchange, cryptocurrency, transactions, method`,
  `FAQ: [
    {question: 'What are the fees for exchanging ${fiat} for ${currency} in ${geo}?', answer: 'The fees for exchanging ${fiat} for ${currency} in ${geo} depend on the transaction amount, currency rates, and specific service terms at the time of the exchange.'},
    {question: 'How long does order processing take?', answer: 'Order processing times vary depending on the specific details of the transaction, such as the amount being exchanged and the current workload of the exchange service.'},
    {question: 'How to transfer ${fiat} to ${currency} without any fees?', answer: 'Transferring ${fiat} to ${currency} without any fees may not be possible as most exchanges charge a small fee to cover service costs. However, some promotions or special terms might offer reduced fees.'},
    {question: 'How do I find the currency I need to exchange?', answer: 'To find the currency you need for an exchange, visit our exchange platform, navigate through the listed currencies, or use the search feature to directly find ${fiat} or ${currency}.'}
  ]`
];
  
module.exports = {
    getPromptTitle,
    getPromptContents
};
