const fs = require("fs").promises;
// const { structureMap } = require("./format-response");
const {
    getMessage,
    waitForResponseMessage,
} = require("./api/fetchMessageFromOpenAi");
// const { getPromptTitle, getPromptContents } = require("./prompt");
const { currencyToFiat, fiat_mappings} = require("./geo-maps");

const getPromptTitle = (fiat, currency) => `Dont generate! This is static title i need only translate: (Exchange ${fiat} with ${currency})`;
const getPromptContents = (fiat, currency) => [
    `description: Write an intro for the article 'Exchange ${fiat} for ${currency}' without writing the headline. Use words: exchange, sell, transfer, cash, cryptocurrency https://easy-changer.io/how-to-exchange-cryptocurrency/`,
    `title: Advantages of the Easy-Changer service when exchanging ${fiat} for ${currency} list: Reinterpret the text below with the advantages listed. Example: Fast, Secure, Profitable, Convenient. Use words: cryptocurrency, amount, quantity, reliability`,
    `description: Enhance the text below with the advantages of the advantageous exchange Easy-Changer ${fiat} for ${currency}`,
    `title: Online exchange process of ${fiat} for ${currency} through Easy-Changer description: Write several paragraphs for the section 'Online exchange process of ${fiat} for ${currency} through Easy-Changer'. Include an organic link to the page https://easy-changer.io/how-to-exchange-cryptocurrency/. Use words: method, funds, transactions, cash`,
    `title: Security and reliability description: Write several paragraphs for the section 'Security and reliability'. Include an organic link to the page https://easy-changer.io/safety/. Use words: exchange, cryptocurrency, transactions, method`,
    `FAQ: [
      {question: 'What payment methods are supported when buying ${currency} for ${fiat}?', answer: 'When purchasing ${currency} for ${fiat}, you can typically use bank transfers, credit cards, and some digital payment methods offered through our platform.'},
      {question: 'Is there a way to track the status of my exchange of ${fiat} for ${currency}?', answer: 'Yes, our platform provides real-time tracking features allowing you to monitor the status of your exchange from initiation to completion.'},
      {question: 'Does Easy-Changer offer any discounts or bonuses for regular customers?', answer: 'Yes, Easy-Changer offers various discounts and bonus schemes for our regular customers to make their exchange experiences more beneficial.'},
      {question: 'How much ${currency} can I buy for 100 ${fiat}?', answer: 'The amount of ${currency} you can buy for 100 ${fiat} depends on the current exchange rate provided on our platform, which includes any applicable fees.'}
    ]`
  ]
  
  
  
const structureMap = {
    title: {
        UA: "",
        US: "",
        RU: "",
    },
    items: [
        {
            UA: {  description: "" },
            US: {  description: "" },
            RU: {  description: "" },
        },
        {
            UA: { title: "", items: [{title: "", description: ""}] },
            US: { title: "", items: [{title: "", description: ""}] },
            RU: { title: "", items: [{title: "", description: ""}] },
        },
        {
            UA: {  description: "" },
            US: {  description: "" },
            RU: {  description: "" },
        },
        {
            UA: { title: "", description: "" },
            US: { title: "", description: "" },
            RU: { title: "", description: "" },
        },
        {
            UA: { title: "", description: "" },
            US: { title: "", description: "" },
            RU: { title: "", description: "" },
        },
        {
            faq: {
                UA: {
                    items: [{ question: "", answer: "" }],
                },
                US: {
                    items: [{ question: "", answer: "" }],
                },
                RU: {
                    items: [{ question: "", answer: "" }],
                },
            },
        }
    ]
};

const pairs = [
    "WISEUSD-to-USDTTRC20",
    "WISEUSD-to-USDTERC20",
    "WISEEUR-to-USDTERC20",
    "WISEEUR-to-USDTTRC20",
    "SEPAEUR-to-USDTTRC20",
    "SEPAEUR-to-USDTERC20",
    "PNRUSD-to-USDTTRC20",
    "SKLUSD-to-USDTTRC20",
    "SKLUSD-to-USDTERC20",
    "PNRUSD-to-USDTERC20"
]


async function generateDescriptions() {
    const currencyPosts = {};
    const [title, items] = Object.values(structureMap);

    

    for (const item of pairs) {
        const rout = item;
        const [fiat, currency] = item.split('-to-');

        if (!currencyPosts[rout]) {
            currencyPosts[rout] = {};
        }

        currencyPosts[rout]['items'] = [];

        try {
            const stream = await getMessage(
                getPromptTitle(fiat, currency),
                item,
                title 
            );

            const response = await waitForResponseMessage(stream);
            console.log('response:', response);

            currencyPosts[rout]['title'] = { ...JSON.parse(response) };
        } catch (error) {
            console.log(
                `Error fetching data for ${item}:`,
                error
            );
        }

        for (const iterator in items) {
            const prompt = getPromptContents(fiat, currency)[iterator];

            try {
                const stream = await getMessage(
                    prompt,
                    item,
                    items[iterator]
                );

                const response = await waitForResponseMessage(stream);
                currencyPosts[rout]['items'].push(JSON.parse(response));
                console.log(response);
            } catch (error) {
                console.log(
                    `Error fetching data for ${item}:`,
                    error
                );
            }
        }
    }

    return currencyPosts;
}

generateDescriptions().then((allPosts) => {
    const postsFilePath = `exchange-fiat-to-currency-${Math.floor(1000 + Math.random() * 9000)}.json`;
    fs.writeFile(postsFilePath, JSON.stringify({ allPosts }, null, 2), "utf8");
    console.log("All posts: ", JSON.stringify(allPosts, null, 2));
});
