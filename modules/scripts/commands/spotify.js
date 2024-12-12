const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports.config = {
    name: "spotify", // command name
    author: "Chael",
    version: "1.0",
    category: "Music",
    description: "Search and play a Spotify song", // description of the command
    adminOnly: false, // if false all users can use this command but if true only admins can use
    usePrefix: true, // if true it uses the command with the prefix
    cooldown: 5, // cooldown on how many command to be used
};

module.exports.run = async function ({ event, args }) {
    try {
        // Join the command arguments into a single user query string
        const songQuery = args.join(" ");

        // Make an API request to fetch the Spotify song link
        const response = await axios.get(`https://hiroshi-api.onrender.com/tiktok/spotify?search=${encodeURIComponent(songQuery)}`);
        const spotifyLink = response.data[0]?.download;

        // Check if a valid Spotify link was found
        if (spotifyLink) {
            // File path for saving the song
            const filePath = path.join(__dirname, "cache", `spotify_song_${Date.now()}.mp3`);

            // Download the Spotify song and save it in the cache folder
            const writer = fs.createWriteStream(filePath);
            const downloadResponse = await axios({
                method: "get",
                url: spotifyLink,
                responseType: "stream",
            });
            downloadResponse.data.pipe(writer);

            // Wait until the file is fully downloaded
            await new Promise((resolve, reject) => {
                writer.on("finish", resolve);
                writer.on("error", reject);
            });

            // Send the downloaded file as an audio attachment
            await api.sendAttachment("file", filePath, event.sender.id);

            // Delete the file after sending
            fs.unlink(filePath, (err) => {
                if (err) console.error("Error deleting file:", err);
            });
        } else {
            // Send an error message if no link was found
            await api.sendAttachment("text", "Sorry, no Spotify link found for that query.", event.sender.id);
        }
    } catch (err) {
        console.error("Error processing Spotify command:", err);
        // Send a message if an error occurred
        await api.sendAttachment("text", "An error occurred while trying to fetch the Spotify song.", event.sender.id);
    }
};
