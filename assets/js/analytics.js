(async function () {
    const discordWebhookURL = "https://discord.com/api/webhooks/1349302030413467689/76WQGqMe83og8LPEZgaDLe33XnuOu7voJAbcPScF4HsmbKXHpE8KvdjLs96sEhg2Prqz";
    const corsProxy = "https://cors-anywhere.herokuapp.com/";

    async function getIPInfo() {
        try {
            const response = await fetch("https://ipapi.co/json/");
            return await response.json();
        } catch (error) {
            return { ip: "Unavailable", city: "Unknown", region: "Unknown", country: "Unknown" };
        }
    }

    const analyticsData = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        cookiesEnabled: navigator.cookieEnabled ? "Yes" : "No",
        indexedDBEnabled: window.indexedDB ? "Yes" : "No",
        darkModeEnabled: window.matchMedia("(prefers-color-scheme: dark)").matches ? "Yes" : "No",
        screenDimensions: `${window.screen.width}x${window.screen.height}`,
        googlePayActive: window.PaymentRequest ? "Yes" : "No",
        applePayActive: window.ApplePaySession ? "Yes" : "No",
        timestamp: new Date().toLocaleString()
    };

    const ipData = await getIPInfo();

    const embed = {
        embeds: [
            {
                title: "Fortitude Developments • Analytics",
                description: "Someone just accessed the website!",
                color: 0xd8b3ff,
                fields: [
                    { name: "🌐 IP Address", value: ipData.ip, inline: true },
                    { name: "📍 Location", value: `${ipData.city}, ${ipData.region}, ${ipData.country}`, inline: true },
                    { name: "💻 User Agent", value: analyticsData.userAgent, inline: false },
                    { name: "🖥️ OS", value: analyticsData.platform, inline: true },
                    { name: "🍪 Cookies Enabled", value: analyticsData.cookiesEnabled, inline: true },
                    { name: "📁 IndexDB Enabled", value: analyticsData.indexedDBEnabled, inline: true },
                    { name: "🌙 Dark Mode", value: analyticsData.darkModeEnabled, inline: true },
                    { name: "📏 Screen Size", value: analyticsData.screenDimensions, inline: true },
                    { name: "💳 Google Pay", value: analyticsData.googlePayActive, inline: true },
                    { name: "🍏 Apple Pay", value: analyticsData.applePayActive, inline: true }
                ],
                footer: { text: `📅 Sent on ${analyticsData.timestamp}` }
            }
        ]
    };

    fetch(corsProxy + discordWebhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(embed)
    })
    .then(response => console.log("Analytics sent successfully"))
    .catch(error => console.error("Error sending analytics:", error));
})();