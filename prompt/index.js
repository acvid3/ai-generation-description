// const getPromptSellCurrency = (currency) => {
//     return `Write an intro for the article 'Sell ${currency}'. Use words: rate, online, service, sales.`;
// };

// const getPromptBestTimeToSellCurrency = (currency) => {
//     return `Briefly write 'When is the best time to sell ${currency}?'`;
// };

// const getPromptWaysToSellCurrency = (currency) => {
//     return `Briefly list the ways to sell ${currency} and their main features. Count Items min 3 max 6, length min 20 words`;
// };

// const getPromptHowToSellCurrencyWithEasyChanger = (currency) => {
//     return `Write text for the paragraph 'How to sell ${currency} using Easy-Changer?' Also, organically include the link https://easy-changer.io/how-to-exchange-cryptocurrency/. Use words: rate, payment methods, verification, fees, sales, wallet.`;
// };

// const getPromptReliabilityOfExchangeService = (currency) => {
//     return `Write text for the paragraph 'Reliability of the exchange service'. Organically insert the link https://easy-changer.io/safety/#safety-exchange. Use keywords: cryptocurrency, currency exchange, bank, service.`;
// };

// const getPromptWhatElseCanYouDoBesidesSellingCurrency = (currency) => {
//     return `Write text for the paragraph 'What else can you do besides selling ${currency}?' Use words: purchase, exchange, online. items min 3`;
// };

// const getPromptFAQHowMuchDoesItCostToSellOneCurrency = (currency) => {
//     return `
//     Count Items min 3 max 6, length answer min 20 words
//     FAQ: Briefly answer the question: 'How much does it cost to sell 1 ${currency}?'
//     FAQ: Briefly answer the question: 'How to sell ${currency} safely?'
//     FAQ: Briefly answer the question: 'What is the fee for selling ${currency}?' Include in the answer: The fee is included in the rate.
//     FAQ: Briefly answer the question: 'How to cash out money from ${currency}?'
//     `;
// };

// module.exports = {
//     getPromptSellCurrency,
//     getPromptBestTimeToSellCurrency,
//     getPromptWaysToSellCurrency,
//     getPromptHowToSellCurrencyWithEasyChanger,
//     getPromptReliabilityOfExchangeService,
//     getPromptWhatElseCanYouDoBesidesSellingCurrency,
//     getPromptFAQHowMuchDoesItCostToSellOneCurrency
// }

// const getPromptBuyCurrency = (currency) => {
//     return `Write an intro for the article 'Buy ${currency}'. Use words: service, purchase, buy.`;
// };

// const getPromptAdvantagesOfCurrency = (currency) => {
//     return `Briefly list the advantages of ${currency}. Do not start with 'of course'. Count Items min 3 max 6, length min 20 words`;
// };

// const getPromptDisadvantagesOfCurrency = (currency) => {
//     return `Briefly list the disadvantages of ${currency}. Just the list. Count Items min 3 max 6, length min 20 words`;
// };

// const getPromptWaysToBuyCurrency = (currency) => {
//     return `Briefly list the ways to buy ${currency} and their main features. Do not start with 'of course'. Count Items min 3 max 6, length min 20 words`;
// };

// const getPromptEasyWayToBuyCurrency = (currency) => {
//     return `Write a few paragraphs of text for the section 'Easy way to buy ${currency}'. Use words: online, purchase, rate, verification, service.`;
// };

// const getPromptProfitableWayToBuyCurrency = (currency) => {
//     return `Write a few paragraphs of text for the section 'How to buy ${currency} profitably'. Use words: bank, service, fees, buy.`;
// };

// const getPromptCurrentRateOfCurrency = (currency) => {
//     return `Write a few paragraphs of text for the section 'Where to find the current rate of ${currency}'. Incorporate organically a link to https://easy-changer.io/safety/#safety-exchange. Use words: rate, payment methods, limits.`;
// };

// const getPromptReliabilityOfExchangeService = (currency) => {
//     return `Write a few paragraphs of text for the section 'Reliability of the exchange service'. Add organically a link to https://easy-changer.io/safety/. Use words: verification, online, bank, service.`;
// };

// const getPromptAdvantagesOfEasyChanger = (currency) => {
//     return `Rewrite the text uniquely. Simple and fast process of buying cryptocurrency. Competitive exchange rates. Low fees. Reliability and security of each transaction. 24/7 customer support. Add organically a link to https://easy-changer.io/safety/#registration-mandatory. Count Items min 3 max 6, length min 20 words`;
// };

// const getPromptFAQMinimumPurchaseVolume = (currency) => {
//     return ` Count Items min 3 max 6, length answer min 20 words
//     FAQ: Briefly answer the question: 'What is the minimum purchase volume of ${currency}?'
//     FAQ: Briefly answer the question: 'Can I buy 0.1 ${currency}?'
//     FAQ: Briefly answer the question: 'What payment methods do we accept?'
//     FAQ: Briefly answer the question: 'How long does the purchase process of ${currency} take?'
//     `;
// };

// module.exports = {
//     getPromptBuyCurrency, 
//     getPromptAdvantagesOfCurrency, 
//     getPromptDisadvantagesOfCurrency,
//     getPromptWaysToBuyCurrency,
//     getPromptEasyWayToBuyCurrency,
//     getPromptProfitableWayToBuyCurrency,
//     getPromptCurrentRateOfCurrency,
//     getPromptReliabilityOfExchangeService,
//     getPromptAdvantagesOfEasyChanger,
//     getPromptFAQMinimumPurchaseVolume
// }

const getPromptCryptoExchangeIntro = (geo) => `Write an intro for the commercial page text 'Crypto Exchange in ${geo}'. Use the words: cryptocurrency exchange, service`;

const getPromptBuyAndSellCrypto = (geo) => `Write several paragraphs of text for 'Buying and Selling Cryptocurrency in ${geo}'. Use the words: crypto exchange, address, online`;

const getPromptExchangeOptions = (geo) => `Customize the text and add a brief description for each option of buying, selling, or exchanging cryptocurrency in ${geo}: With a card, From an account, In cash, Using electronic wallets`;

const getPromptAdvantagesOfEasyChanger = (geo) => `Customize the text about the advantages of the Easy-Changer crypto exchange in ${geo}`;

const getPromptHowToExchangeCrypto = () => `Write 3-4 paragraphs of text for the section 'How to Exchange Cryptocurrency?' on the commercial page of the website, using words: address, online, service`;

const getPromptSafetyOfEasyChanger = () => `Write 3-4 paragraphs of text for the section 'Safety of the Easy-Changer Service' on the commercial page of the website, using words: cryptocurrency exchange, crypto exchange`;

const getPromptFAQAvailableCryptocurrencies = (geo) => `Answer briefly the question: 'What cryptocurrencies are available for purchase and sale through the crypto exchange in ${geo}?'`;

const getPromptFAQExchangeMethods = (geo) => `Answer briefly the question: 'What are the methods of exchanging cryptocurrency through Easy-Changer in ${geo}?'`;

const getPromptFAQFees = (geo) => `Answer briefly the question: 'What are the fees for cryptocurrency transactions through Easy-Changer in ${geo}?'`;

const getPromptFAQTransactionSpeed = () => `Answer briefly the question: 'How fast are the purchase, sale, or exchange transactions of cryptocurrency through Easy-Changer?'`;

const getPromptFAQLimits = () => `Answer briefly the question: 'What are the minimum and maximum amounts for transactions through Easy-Changer?'`;

const getPromptFAQSupportedWallets = () => `Answer briefly the question: 'What wallets are supported for depositing and withdrawing cryptocurrency through Easy-Changer?'`;

module.exports = {
    getPromptCryptoExchangeIntro,
    getPromptBuyAndSellCrypto,
    getPromptExchangeOptions,
    getPromptAdvantagesOfEasyChanger,
    getPromptHowToExchangeCrypto,
    getPromptSafetyOfEasyChanger,
    getPromptFAQAvailableCryptocurrencies,
    getPromptFAQExchangeMethods,
    getPromptFAQFees,
    getPromptFAQTransactionSpeed,
    getPromptFAQLimits,
    getPromptFAQSupportedWallets
};

