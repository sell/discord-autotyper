const puppeteer = require('puppeteer');

// list all the words here, will pick them randomly, doesn't matter how many!
const words = [
    "hey",
    "hello",
    "test",
    "sell",
    "jay",
    "javascript",
]
let logCount = 0;

const BASE_URL = 'https://discord.com';
const CHANNELS_URL = `https://discord.com/channels/734363138832728074/734363141139333153` // change this & enter the channel url
const discord = {
    browser: null,
    page: null,

    initialize: async () => {

        discord.browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: [
                '--start-maximized'
            ]
        });

        discord.page = await discord.browser.newPage();

    },

    login: async (username, password) => {

        await discord.page.goto(BASE_URL, {
            waitUntil: 'networkidle2'
        })

        let loginButton = await discord.page.$x('//a[contains(text(), "Login")]');

        /* Click on login url button */

        await loginButton[0].click();

        await discord.page.waitForNavigation({
            waitUntil: 'networkidle2'
        })

        await discord.page.waitFor(100);

        /* username and password */

        await discord.page.type('input[name="email"]', username, {
            delay: 100
        });

        await discord.page.type('input[name="password"]', password, {
            delay: 110
        });

        /* clicking on login button */

        loginButton = await discord.page.$x('//div[contains(text(), "Login")]');
        await loginButton[0].click();

        await discord.page.waitFor(10000);
        await discord.page.waitFor('//div[contains(text(), "Friends")]')

    },



    likeChannelProcess: async () => {

            await discord.page.goto(CHANNELS_URL, {

            });
            await discord.page.waitFor(10000);

            async function initalStart () {
                await discord.page.type('span[data-slate-object="text"]', "auto typer started.", {
                    delay: 100
                });

                await discord.page.keyboard.press('Enter')

                console.debug('Auto typer started ' + new Date() )

            }

            await initalStart();


            async function randomWord () {
                const random = words[Math.floor(Math.random() * words.length)]
                await discord.page.type('span[data-slate-object="text"]', random, {
                    delay: 100
                });

                await discord.page.keyboard.press('Enter')

                logCount++

                // this logs the time the message was sent at and the total message count
                console.debug('Message sent: ' + random + ' , at: ' + new Date() + ', Message Count: ' + logCount )
            }

            // change the first number for minutes
            // 3 * 60 * 1000 = 180000ms === 3 minutes
            setInterval(randomWord, 3 * 60 * 1000)

    }
}

module.exports = discord;