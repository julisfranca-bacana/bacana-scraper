const express = require("express");
const { chromium } = require("playwright");

const app = express();

app.get("/", (req, res) => {
    res.send("BACANA Scraper Online");
});

app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        service: "BACANA Scraper",
        version: "1.0"
    });
});

app.get("/test", async (req, res) => {

    let browser;

    try {

        browser = await chromium.launch({
            headless: true
        });

        const page = await browser.newPage();

        await page.goto("https://example.com");

        const title = await page.title();

        await browser.close();

        res.json({
            success: true,
            title: title
        });

    } catch (e) {

        if (browser) {
            await browser.close();
        }

        res.status(500).json({
            success: false,
            error: e.message
        });

    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`BACANA Scraper iniciado na porta ${PORT}`);
});
