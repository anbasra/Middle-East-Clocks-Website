// Middle Eastern countries data
const countries = [
    { name: "Saudi Arabia", capital: "Riyadh", timezone: "Asia/Riyadh", flag: "https://flagcdn.com/w80/sa.png", currency: "SAR" },
    { name: "UAE", capital: "Abu Dhabi", timezone: "Asia/Dubai", flag: "https://flagcdn.com/w80/ae.png", currency: "AED" },
    { name: "Qatar", capital: "Doha", timezone: "Asia/Qatar", flag: "https://flagcdn.com/w80/qa.png", currency: "QAR" },
    { name: "Kuwait", capital: "Kuwait City", timezone: "Asia/Kuwait", flag: "https://flagcdn.com/w80/kw.png", currency: "KWD" },
    { name: "Oman", capital: "Muscat", timezone: "Asia/Muscat", flag: "https://flagcdn.com/w80/om.png", currency: "OMR" },
    { name: "Bahrain", capital: "Manama", timezone: "Asia/Bahrain", flag: "https://flagcdn.com/w80/bh.png", currency: "BHD" },
    { name: "Iraq", capital: "Baghdad", timezone: "Asia/Baghdad", flag: "https://flagcdn.com/w80/iq.png", currency: "IQD" },
    { name: "Jordan", capital: "Amman", timezone: "Asia/Amman", flag: "https://flagcdn.com/w80/jo.png", currency: "JOD" },
    { name: "Lebanon", capital: "Beirut", timezone: "Asia/Beirut", flag: "https://flagcdn.com/w80/lb.png", currency: "LBP" },
    { name: "Egypt", capital: "Cairo", timezone: "Africa/Cairo", flag: "https://flagcdn.com/w80/eg.png", currency: "EGP" }
];

// Cache for exchange rates
let exchangeRates = {};
const CACHE_TIME = 60 * 60 * 1000; // 1 hour cache

// Format time as HH:MM:SS
function formatTime(date) {
    return date.toLocaleTimeString('en-US', { hour12: false, timeZone: date.timezone });
}

// Format date
function formatDate(date) {
    return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        timeZone: date.timezone 
    });
}

// Create clock card HTML
function createClockCard(country) {
    const now = new Date();
    const options = { timeZone: country.timezone };
    const localTime = new Date(now.toLocaleString('en-US', options));
    
    return `
        <div class="clock-card">
            <img src="${country.flag}" alt="${country.name} Flag" class="country-flag">
            <h2 class="country-name">${country.name}</h2>
            <p class="country-capital">${country.capital}</p>
            <div class="time">${formatTime(localTime)}</div>
            <div class="date">${formatDate(localTime)}</div>
            <div class="exchange-rate" id="rate-${country.currency}">
                1 USD = <span class="loading">loading...</span>
            </div>
        </div>
    `;
}

// Fetch exchange rates from API
async function fetchExchangeRates() {
    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        return data.rates || {};
    } catch (error) {
        console.error("Error fetching rates:", error);
        // Fallback rates if API fails
        return {
            "SAR": 3.75, "AED": 3.67, "QAR": 3.64, "KWD": 0.31,
            "OMR": 0.38, "BHD": 0.38, "IQD": 1460, "JOD": 0.71,
            "LBP": 1507, "EGP": 15.7
        };
    }
}

// Update all clocks
function updateClocks() {
    countries.forEach(country => {
        const now = new Date();
        const options = { timeZone: country.timezone };
        const localTime = new Date(now.toLocaleString('en-US', options));
        
        const clockElement = document.querySelector(`.clock-card:nth-child(${countries.indexOf(country) + 1}) .time`);
        if (clockElement) {
            clockElement.textContent = formatTime(localTime);
        }
    });
}

// Update exchange rates display
function updateExchangeRates() {
    countries.forEach(country => {
        const rateElement = document.getElementById(`rate-${country.currency}`);
        if (rateElement && exchangeRates[country.currency]) {
            rateElement.innerHTML = `1 USD = <span>${exchangeRates[country.currency].toFixed(4)} ${country.currency}</span>`;
        }
    });
}

// Initialize the application
async function init() {
    // Render all clock cards
    const clocksContainer = document.getElementById('clocksContainer');
    clocksContainer.innerHTML = countries.map(createClockCard).join('');
    
    // Load exchange rates
    exchangeRates = await fetchExchangeRates();
    updateExchangeRates();
    
    // Update clocks every second
    setInterval(updateClocks, 1000);
    
    // Refresh rates every hour
    setInterval(async () => {
        exchangeRates = await fetchExchangeRates();
        updateExchangeRates();
    }, CACHE_TIME);
}

// Start the app when page loads
window.addEventListener('DOMContentLoaded', init);