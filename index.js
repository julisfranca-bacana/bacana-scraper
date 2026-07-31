const express = require("express");
const { chromium } = require("playwright");

const app = express();

app.get("/", async (req, res) => {

    const url = req.query.url;

    if (!url) {
        return res.send("Use: ?url=https://...");
    }

    let browser;

    try {

        browser = await chromium.launch({
            headless: true
        });

        const page = await browser.newPage();

        await page.goto(url, {
            waitUntil: "domcontentloaded",
            timeout: 60000
        });

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
    console.log("Servidor iniciado.");
});
