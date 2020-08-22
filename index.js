const dc = require('./discord');

(async () => {

    await dc.initialize();
    // here is where you enter your password and email
    await dc.login('email', 'password')

    await dc.likeChannelProcess()

    debugger;

})();
