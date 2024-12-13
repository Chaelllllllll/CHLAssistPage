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

            console.log("Download link:", link);

            // Download the MP3 file
            const mp3Path = path.resolve(__dirname, 'temp.mp3');
            const writer = fs.createWriteStream(mp3Path);

            const downloadResponse = await axios({
                url: link,
                method: 'GET',
                responseType: 'stream',
            });

            downloadResponse.data.pipe(writer);

            // Wait for the download to complete
            await new Promise((resolve, reject) => {
                writer.on('finish', resolve);
                writer.on('error', reject);
            });

            // Send the MP3 file as a message
            await api.sendMessage({
                body: `Here is your requested track: ${response.data[0].name}`,
                attachment: fs.createReadStream(mp3Path),
            }, event.senderID);

            // Clean up the temporary file
            fs.unlinkSync(mp3Path);
        } else {
            console.error("Invalid response structure or no data available:", response.data);
        }
    } catch (err) {
        console.error("Error occurred:", err);
    }
};
