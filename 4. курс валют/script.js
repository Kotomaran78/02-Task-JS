const apiKey = '';
const apiHost = 'currency-exchange.p.rapidapi.com';
const baseCurrency = 'RUB';
const targetCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD'];

const options = (targetCurrency) => ({
  method: 'GET',
  url: 'https://currency-exchange.p.rapidapi.com/exchange',
  params: {
    from: targetCurrency,
    to: baseCurrency,
    q: '1.0'
  },
  headers: {
    'x-rapidapi-key': apiKey,
    'x-rapidapi-host': apiHost
  }
});

async function fetchExchangeRate(currency) {
  try {
    const response = await axios.request(options(currency));
    return response.data;
  } catch (error) {
    console.error(`Error fetching exchange rate for ${currency}:`, error);
    return null;
  }
}

function updateLastChecked() {
  const now = new Date();
  const lastChecked = document.getElementById('lastChecked');
  lastChecked.textContent = `Last checked: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
}

async function updateExchangeRates() {
  const exchangeRatesContainer = document.getElementById('exchangeRates');
  exchangeRatesContainer.innerHTML = '';

  for (const currency of targetCurrencies) {
    const rate = await fetchExchangeRate(currency);
    if (rate) {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `<h2>${currency}</h2><p>${rate.toFixed(2)} ${baseCurrency}</p>`;
      exchangeRatesContainer.appendChild(card);
    }
  }

  updateLastChecked();
}

document.addEventListener('DOMContentLoaded', function() {
  updateExchangeRates();
  setInterval(updateExchangeRates, 15 * 60 * 1000);
});
