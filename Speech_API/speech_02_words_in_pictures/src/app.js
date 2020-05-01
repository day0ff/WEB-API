const express = require('express');
const path = require('path');
const puppeteer = require('puppeteer');


const PATH_PUBLIC_DIR = path.join(__dirname, '../public');
const URL = 'https://yandex.by/images/search?text=%s+jpeg';

const app = express();

app.use(express.static(PATH_PUBLIC_DIR));

app.get('/img', async (req, res) => {
    const word = req.query.word;
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto(URL.replace('%s',word));
    const src = await page.evaluate(() =>  document.querySelectorAll('img').item(1).src);
    await browser.close();
    res.send({word, src});
});

app.listen(3000, () => console.log('listening on port 3000\nhttp://localhost:3000/'));
