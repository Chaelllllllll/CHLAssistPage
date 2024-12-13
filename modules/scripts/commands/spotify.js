const axios = require('axios');

module.exports.config = {
    name: "spotify", // command name
    author: "Kenlie Jugarap",
    version: "1.0",
    category: "test",
    description: "Test send image message thru url",
    adminOnly: false, // if false all users can use this command but if true only the admin id lists on config.json can use
    usePrefix: true, // if true it uses the command with the prefix example /testsendimage-url but if false no need prefix can direct use testsendimage-url
    cooldown: 5, // cooldown on how many command to be used
};

module.exports.run = async function ({ event, args }) {
    try {
        const userInput = args.join(" ");
        
        const response = await axios.get(`https://hiroshi-api.onrender.com/tiktok/spotify?search=${encodeURIComponent(userInput)}`);

        if (response && response.status) {
            const link = response[0].download;

            console.log(link);

            await api.sendAttachment("url", link, event.sender.id);
        }

    } catch (err) {
        console.log(err);
    }
};