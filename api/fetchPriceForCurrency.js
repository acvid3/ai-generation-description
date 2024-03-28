const getCurrentPrice = async (currency) => {
    const url = `https://www.binance.com/api/v3/depth?symbol=${currency}USDT&limit=1`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        return parseFloat(data.bids[0][0]).toFixed(2);
    } catch (error) {
        console.error(`Error fetching price for ${currency}:`, error);
        return null;
    }
};

module.exports = { getCurrentPrice };
