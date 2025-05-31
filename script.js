  // Middle Eastern countries with their timezones and flag image URLs
        const countries = [
            {
                name: "Saudi Arabia",
                capital: "Riyadh",
                timezone: "Asia/Riyadh",
                flag: "https://flagcdn.com/w80/sa.png"
            },
            {
                name: "United Arab Emirates",
                capital: "Abu Dhabi",
                timezone: "Asia/Dubai",
                flag: "https://flagcdn.com/w80/ae.png"
            },
            {
                name: "Qatar",
                capital: "Doha",
                timezone: "Asia/Qatar",
                flag: "https://flagcdn.com/w80/qa.png"
            },
            {
                name: "Kuwait",
                capital: "Kuwait City",
                timezone: "Asia/Kuwait",
                flag: "https://flagcdn.com/w80/kw.png"
            },
            {
                name: "Oman",
                capital: "Muscat",
                timezone: "Asia/Muscat",
                flag: "https://flagcdn.com/w80/om.png"
            },
            {
                name: "Bahrain",
                capital: "Manama",
                timezone: "Asia/Bahrain",
                flag: "https://flagcdn.com/w80/bh.png"
            },
            {
                name: "Iraq",
                capital: "Baghdad",
                timezone: "Asia/Baghdad",
                flag: "https://flagcdn.com/w80/iq.png"
            },
            {
                name: "Jordan",
                capital: "Amman",
                timezone: "Asia/Amman",
                flag: "https://flagcdn.com/w80/jo.png"
            },
            {
                name: "Lebanon",
                capital: "Beirut",
                timezone: "Asia/Beirut",
                flag: "https://flagcdn.com/w80/lb.png"
            },
            {
                name: "Palestine",
                capital: "Ramallah",
                timezone: "Asia/Gaza",
                flag: "https://flagcdn.com/w80/ps.png"
            },
            {
                name: "Syria",
                capital: "Damascus",
                timezone: "Asia/Damascus",
                flag: "https://flagcdn.com/w80/sy.png"
            },
            {
                name: "Yemen",
                capital: "Sana'a",
                timezone: "Asia/Aden",
                flag: "https://flagcdn.com/w80/ye.png"
            },
            {
                name: "Israel",
                capital: "Jerusalem",
                timezone: "Asia/Jerusalem",
                flag: "https://flagcdn.com/w80/il.png"
            },
            {
                name: "Turkey",
                capital: "Ankara",
                timezone: "Europe/Istanbul",
                flag: "https://flagcdn.com/w80/tr.png"
            },
            {
                name: "Iran",
                capital: "Tehran",
                timezone: "Asia/Tehran",
                flag: "https://flagcdn.com/w80/ir.png"
            },
            {
                name: "Egypt",
                capital: "Cairo",
                timezone: "Africa/Cairo",
                flag: "https://flagcdn.com/w80/eg.png"
            }
        ];

        // Function to format time
        function formatTime(date) {
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let seconds = date.getSeconds();
            
            // Add leading zeros
            hours = hours < 10 ? '0' + hours : hours;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;
            
            return `${hours}:${minutes}:${seconds}`;
        }

        // Function to format date
        function formatDate(date) {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            return date.toLocaleDateString('en-US', options);
        }

        // Function to create clock card
        function createClockCard(country) {
            const clockCard = document.createElement('div');
            clockCard.className = 'clock-card';
            clockCard.id = `clock-${country.name.replace(/\s+/g, '-').toLowerCase()}`;
            
            // Get current time for this country
            const options = { timeZone: country.timezone };
            const now = new Date();
            const localTime = new Date(now.toLocaleString('en-US', options));
            
            clockCard.innerHTML = `
                <img src="${country.flag}" alt="${country.name} Flag" class="country-flag">
                <h2 class="country-name">${country.name}</h2>
                <p class="country-capital">${country.capital}</p>
                <div class="time">${formatTime(localTime)}</div>
                <div class="date">${formatDate(localTime)}</div>
            `;
            
            return clockCard;
        }

        // Function to update all clocks
        function updateClocks() {
            countries.forEach(country => {
                const clockElement = document.getElementById(`clock-${country.name.replace(/\s+/g, '-').toLowerCase()}`);
                if (clockElement) {
                    const options = { timeZone: country.timezone };
                    const now = new Date();
                    const localTime = new Date(now.toLocaleString('en-US', options));
                    
                    clockElement.querySelector('.time').textContent = formatTime(localTime);
                    clockElement.querySelector('.date').textContent = formatDate(localTime);
                }
            });
        }

        // Initialize the page
        function init() {
            const clocksGrid = document.querySelector('.clocks-grid');
            
            // Create clock cards for all countries
            countries.forEach(country => {
                clocksGrid.appendChild(createClockCard(country));
            });
            
            // Update clocks every second
            setInterval(updateClocks, 1000);
        }

        // Start the application when the page loads
        window.onload = init;
    