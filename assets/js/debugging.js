(function () {
    const SEVERITY = {
        WARNING: "color: yellow; font-weight: bold;",
        ERROR: "color: orange; font-weight: bold;",
        CRITICAL: "color: red; font-weight: bold;"
    };

    function detectConsoleOpen() {
        const element = new Image();
        Object.defineProperty(element, 'id', {
            get: function () {
                console.log("%c[DEBUG] Developer Console Opened", SEVERITY.WARNING);
                runDebugChecks();
            }
        });
        console.log(element);
    }

    function runDebugChecks() {
        console.log("%c[DEBUG] Running Website Diagnostics...", "color: cyan; font-weight: bold;");

        const brokenImages = [...document.images].filter(img => !img.complete || img.naturalWidth === 0);
        if (brokenImages.length > 0) {
            console.log("%c[WARNING] Missing or broken images detected!", SEVERITY.WARNING);
            brokenImages.forEach(img => console.log(`%c[WARNING] Missing Image: ${img.src}`, SEVERITY.WARNING));
        }

        const stylesheets = [...document.styleSheets];
        stylesheets.forEach(sheet => {
            try {
                if (!sheet.cssRules || sheet.cssRules.length === 0) {
                    console.log(`%c[WARNING] Stylesheet may be missing or empty: ${sheet.href}`, SEVERITY.WARNING);
                }
            } catch (error) {
                console.log(`%c[ERROR] Cannot access stylesheet: ${sheet.href}`, SEVERITY.ERROR);
            }
        });

        window.addEventListener("error", function (event) {
            console.log(`%c[ERROR] JavaScript Error: ${event.message} at ${event.filename}:${event.lineno}`, SEVERITY.ERROR);
        });

        const requiredElements = ["header", "main", "footer"];
        requiredElements.forEach(tag => {
            if (!document.querySelector(tag)) {
                console.log(`%c[CRITICAL] Missing essential page element: <${tag}>`, SEVERITY.CRITICAL);
            }
        });

        setTimeout(() => {
            const loadTime = performance.now();
            if (loadTime > 3000) {
                console.log(`%c[ERROR] Page is loading slowly (${Math.round(loadTime)}ms)`, SEVERITY.ERROR);
            }
        }, 1000);
    }

    detectConsoleOpen();
})();