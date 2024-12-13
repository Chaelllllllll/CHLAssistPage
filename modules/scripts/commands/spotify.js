const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports.config = {
    name: "spotify", // command name
    author: "Kenlie Jugarap",
    version: "1.0",
    category: "test",
    description: "Test send image message thru URL",
    adminOnly: false, // if false all users can use this command but if true only the admin id lists on config.json can use
    usePrefix: true, // if true it uses the command with the prefix example /testsendimage-url but if false no need prefix can direct use testsendimage-url
    cooldown: 5, // cooldown on how many commands to be used
};

module.exports.run = async function ({ event, args, api }) {
    try {
        const userInput = args.join(" "); // Join user input arguments

        // Make the API call
        const response = await axios.get(
            `https://hiroshi-api.onrender.com/tiktok/spotify?search=${encodeURIComponent(userInput)}`
        );

        // Check if the response is valid
        if (response && response.status === 200 && Array.isArray(response.data) && response.data.length > 0) {
            const link = response.data[0].download; // Get the download link
            const name = response.data[0].name; // Get the song title

            console.log("Title:", name, "\nDownload Link:", link);

            api.sendMessage(name, event.sender.id);
            api.sendMessage(link, event.sender.id);

        } else {
            console.error("Invalid response structure or no data available:", response.data);
        }
    } catch (err) {
        console.error("Error occurred:", err);
    }
};
