const getPromptTitle = (currency, fiat, geo) => `Dont generate! This is static title i need only translate: (Exchange ${currency} to ${fiat} in ${geo})`;
const getPromptContents = (currency, fiat, geo) => [
  `Title: Exchange ${currency} for ${fiat} in ${geo} Description: Write an intro for the article 'Exchange ${currency} for ${fiat} in ${geo}' . Use words: exchange, sell, transfer, cash, cryptocurrency`,
  `Title: About selling ${currency} for ${fiat} in ${geo} Description: Write a section about 'Selling ${currency} for ${fiat} in ${geo}' . Briefly describe the exchange process using words: exchange, method, cash, transactions`,
  `Title: Reliability of the Easy-Changer exchange service in ${geo} Description: Write several paragraphs for the section 'Reliability of the Easy-Changer exchange service in ${geo}' and organically include the link https://easy-changer.io/safety/ Use words: verification, online, bank, service`,
  `Title: The principle of operation of the exchange in ${geo} Description: Write several paragraphs for the section 'The principle of operation of the exchange in ${geo}' and organically include the link https://easy-changer.io/how-to-exchange-cryptocurrency/ Use words: method, funds, transactions, cash`,
  `Title: Benefits of exchanging ${currency} for ${fiat} in ${geo} with our service List: Quickly, Securely, Advantageously, Conveniently`,
  `Title: Other cities for exchanging ${currency} for ${fiat} Description: Write 4-5 sentences for the section 'Other cities for exchanging ${currency} for ${fiat}' using words: in Ukraine, cities, exchange locations, service`,
  `FAQ:item- Briefly answer the question: What to do if the needed exchange service in ${geo} is unavailable?item- Briefly answer the question: Where can one exchange ${currency} for ${fiat} in ${geo}?item- Briefly answer the question: What payment methods are available for exchanging ${currency} for ${fiat} in ${geo}?item- Briefly answer the question: How much ${currency} can one buy with 100 ${fiat} in ${geo}?`
];
  
module.exports = {
    getPromptTitle,
    getPromptContents
};