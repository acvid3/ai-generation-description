const getPromptRate = (currency) => `Курс ${currency}`;

const getPromptHowToCurrency = (currency) => `
    Что такое ${currency}?
    Напиши текст для раздела Что такое ${currency}?используй в тексте курс, график, цена
`;

const getPromptBasicCurrencyExchange = (currency) => `
    Основные курсы обмена ${currency}
    Напиши текст для раздела Основные курсы обмена ${currency}, используй в тексте стоимость, курс онлайн, на рынке
`;

const getPromptHowToWorkingCurrency = (currency) => `
    Как работает ${currency}?
    Напиши текст для раздела Как работает ${currency}?, используй в тексте: цена, стоимость, активы
    Добавь органично в тест ссылку Как осуществить обмен? [https://easy-changer.io/how-to-exchange-cryptocurrency/#how-to]
`;

const getPromptWhereExchange = (currency) => `
    Где можно купить, продать или обменять ${currency}?
    Напиши текст для раздела Где можно купить, продать или обменять ${currency}?, 
    используй в тексте: цена, стоимость, активы
    Добавь органично в тест ссылку Какие лимиты на вывод криптовалюты на карту? [https://easy-changer.io/how-to-exchange-cryptocurrency/#limits-for-withdrawing]
`;

const getPromptHowToStore = (currency) => `
    Как хранить ${currency}?
    Напиши текст для раздела Как хранить ${currency}?, 
    используй в тексте: количество, на рынке
`;

const getPromptFAQ = (currency) => `
    FAQ:
    Ответь кратко на вопрос: “Какие факторы влияют на цену ${currency}?”
    Ответь кратко на вопрос: “Какие риски связаны с инвестированием в ${currency}?”
    Ответь кратко на вопрос: “Какие платежные системы и криптовалютные биржи поддерживают покупку и продажу ${currency}?”
    Ответь кратко на вопрос: “Какие шаги нужно предпринять для обеспечения безопасности ${currency}?” Добавь органично в тест ссылку [https://easy-changer.io/safety/]
    Ответь кратко на вопрос: “Каковы перспективы развития ${currency} в будущем?”
`;

module.exports = {
    getPromptRate,
    getPromptHowToCurrency,
    getPromptBasicCurrencyExchange,
    getPromptHowToWorkingCurrency,
    getPromptWhereExchange,
    getPromptHowToStore,
    getPromptFAQ,
};

// const writeArticleIntro = (currency) => `
//     Купить ${currency}
//     Напиши интро для статьи "Купить ${currency} " не пиши заголовок
//     Используй слова: сервис, покупка, покупать
// `;

// const listAdvantages = (currency) => `
//     Преимущества владения ${currency}
//     Перечисли кратко преимущества ${currency}. Не используй конечно в начале текста
// `;

// const listDisadvantages = (currency) => `
//     Недостатки владения ${currency}
//     Перечисли кратко недастатки ${currency}. Только список
// `;

// const listPurchaseMethods = (currency) => `
//     Способы покупки
//     Перечисли кратко способы покупки ${currency} и их основные особенности. Не используй конечно в начале предложения
// `;

// const simplePurchaseMethod = (currency) => `
//     Простой способ купить ${currency}
//     напиши несколько абзацев текста для раздела текста "Простой способ купить ${currency}"
//     Используй слова: онлайн, покупка, курс, верификация, сервис
// `;

// const buyProfitably = (currency) => `
//     Как выгодно купить ${currency}
//     напиши несколько абзацев текста для раздела страницы "Как выгодно купить ${currency}"
//     Используй слова: банк, сервис, комиссии, покупать
// `;

// const findCurrentRate = (currency) => `
//     Где узнать актуальный курс ${currency}
//     напиши несколько абзацев текста для раздела страницы "Где узнать актуальный курс ${currency}"
//     Добавь органично ссылку на страницу https://easy-changer.io/safety/#safety-exchange
//     Используй слова: курс, методы оплаты, лимиты,
// `;

// const exchangeServiceReliability = () => `
//     Надежность обменного сервиса
//     напиши несколько абзацев текста для раздела страницы "Надежность обменного сервиса"
//     Добавь органично ссылку на страницу https://easy-changer.io/safety/
//     Используй слова: верификация, онлайн, банк, сервис
// `;

// const serviceAdvantages = () => `
//     Преимущества сервиса Easy-Changer
//     уникализируй текст
//     Простой и быстрый процесс покупки криптовалюты
//     Конкурентные курсы обмена
//     Низкие комиссии
//     Надежность и безопасность каждой транзакции
//     Поддержка клиентов 24/7
//     добавь органичн ссылку на страницу https://easy-changer.io/safety/#registration-mandatory
// `;

// const faqMinimumPurchase = (currency) => `
//     FAQ:
//     Ответь кратко на вопрос: “Какой минимальный объем покупки ${currency}?”
//     Ответь кратко на вопрос: “Можно ли купить 0.1 ${currency}?”
//     Ответь кратко на вопрос: “Какие способы оплаты мы принимаем?”
//     Ответь кратко на вопрос: “Как долго занимает процесс покупки ${currency}?”
// `;

// module.exports = {
//     writeArticleIntro,
//     listAdvantages,
//     listDisadvantages,
//     listPurchaseMethods,
//     simplePurchaseMethod,
//     buyProfitably,
//     findCurrentRate,
//     exchangeServiceReliability,
//     serviceAdvantages,
//     faqMinimumPurchase,
// };
