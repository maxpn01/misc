const fs = require('fs'),
      puppeteer = require("puppeteer"),
      website = "https://www.goodreads.com/quotes";

const scrape = async (website) => {
    let browser;

    try {
        browser = await puppeteer.launch({ headless: "new" });

        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(2 * 60 * 1000);

        await page.goto(website, { waitUntil: "domcontentloaded" });

        let quotes = [];
        const pages = 3;

        for (let i = 0; i < pages; i++) {
            quotes = quotes.concat(await page.evaluate(() => 
                Array.from(document.querySelectorAll(".quoteDetails")).map(quote => ({
                    text: quote.querySelector(".quoteText").innerText,
                    author: quote.querySelector(".authorOrTitle").innerText,
                    tags: Array.from(quote.querySelectorAll(".smallText a")).map(tag => tag.innerText),
                })
            )));

            const nextBtn = await page.$(".next_page");

            if (nextBtn) {
                await nextBtn.click();
                await page.waitForNavigation({ waitUntil: "domcontentloaded" });
            } else break;
        }

        console.log(quotes);

        fs.writeFile('quotes.json', JSON.stringify(quotes, null, 1), (err) => {
            if (err) throw err;
            console.log('File saved');
        });
    } catch (err) {
        console.error(err);
    } finally {
        await browser?.close();
    } 
}

scrape(website);