const googleFinance = require('google-finance');

// module returns promise of stock results
module.exports = function validateSymbol(symbol) {
  return googleFinance.historical({
    symbol: `NASDAQ:${symbol}`,
    from: '2000-01-01',
    to: '2017-02-02',
    // period: 'm'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only) 
  })
    .then((results) => {
      return results.length > 0;
    });
}