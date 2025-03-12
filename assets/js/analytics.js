async function sendAnalyticsToDiscord() {
    const webhookURL = "https://discord.com/api/webhooks/1349302030413467689/76WQGqMe83og8LPEZgaDLe33XnuOu7voJAbcPScF4HsmbKXHpE8KvdjLs96sEhg2Prqz";
    const embedColor = 0xD8B3FF;

    async function getIPInfo() {
        try {
            const response = await fetch("https://ipapi.co/json/");
            const data = await response.json();
            return {
                ip: data.ip || "Unknown",
                location: `${data.city}, ${data.region}, ${data.country_name}` || "Unknown"
            };
        } catch (error) {
            console.error("Error fetching IP info:", error);
            return { ip: "Unknown", location: "Unknown" };
        }
    }

    function getBrowserInfo() {
        return {
            userAgent: navigator.userAgent || "Unknown",
            os: `${navigator.platform} (${navigator.appVersion})` || "Unknown",
            cookiesEnabled: navigator.cookieEnabled ? "Yes" : "No",
            indexDBEnabled: !!window.indexedDB ? "Yes" : "No",
            darkModeEnabled: window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "Yes" : "No",
            screenDimensions: `${window.screen.width}x${window.screen.height}`,
            googlePayActive: !!window.PaymentRequest ? "Yes" : "No",
            applePayActive: window.ApplePaySession ? "Yes" : "No"
        };
    }

    function getCurrentTimestamp() {
        return new Date().toLocaleString();
    }

    const ipInfo = await getIPInfo();
    const browserInfo = getBrowserInfo();
    const timestamp = getCurrentTimestamp();

    const embed = {
        title: "Fortitude Developments • Analytics",
        description: "Someone just accessed the website!",
        color: embedColor,
        fields: [
            { name: "IP Address", value: ipInfo.ip, inline: false },
            { name: "General Location", value: ipInfo.location, inline: false },
            { name: "UserAgent", value: browserInfo.userAgent, inline: false },
            { name: "Operating System / Platform", value: browserInfo.os, inline: false },
            { name: "Cookies Enabled", value: browserInfo.cookiesEnabled, inline: true },
            { name: "IndexDB Enabled", value: browserInfo.indexDBEnabled, inline: true },
            { name: "Dark Mode Enabled", value: browserInfo.darkModeEnabled, inline: true },
            { name: "Screen Dimensions", value: browserInfo.screenDimensions, inline: false },
            { name: "Google Pay Active", value: browserInfo.googlePayActive, inline: true },
            { name: "Apple Pay Active", value: browserInfo.applePayActive, inline: true }
        ],
        footer: {
            text: `Data collected on: ${timestamp}`
        }
    };

    fetch(webhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ embeds: [embed] })
    }).catch(error => console.error("Error sending analytics to Discord:", error));
}

window.onload = sendAnalyticsToDiscord;