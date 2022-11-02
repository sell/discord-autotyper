const dc = require('./discord');
const dotenv = require('dotenv');
const { sig } = require("./utils/sig");

(async () => {
    sig();
    dotenv.config();

    // console.log(process.env.DISCORD_EMAIL)
    await dc.initialize();
    // here is where you enter your email and password
    await dc.login(process.env.DISCORD_EMAIL, process.env.DISCORD_PASSWORD)

    await dc.likeChannelProcess(process.env.DISCORD_SERVER_ID, process.env.DISCORD_CHANNEL_ID, 1) // 1 = 1 minute

    debugger;

})();
