const axios = require('axios'); 

module.exports.config = {
    name: "spotify", 
    author: "Chael",
    version: "1.0",
    category: "Music",
    description: "Search and play a Spotify song",
    adminOnly: false, 
    usePrefix: true, 
    cooldown: 5, 
};

module.exports.run = async function ({ event, args }) {
    try {
        // Join the command arguments into a single user query string
        const songQuery = args.join(" ");

        // Make an API request to fetch the Spotify link
        const response = await axios.get(`https://hiroshi-api.onrender.com/tiktok/spotify?search=${encodeURIComponent(songQuery)}`);
        const spotifyLink = response.data[0]?.download;

        // Check if the Spotify link was found
        if (spotifyLink) {
            // If a Spotify link is found, send it as an audio message
            api.sendMessage({
                attachment: { type: 'audio', payload: { url: spotifyLink, is_reusable: true } }
            }, event.sender.id);
        } else {
            // If no Spotify link is found, send an error message
            api.sendMessage("Sorry, no Spotify link found for that query.", event.sender.id).catch(err => {
                console.error("Error sending message:", err);
            });
        }
    } catch (error) {
        // If an error occurs while fetching data from the API, send an error message
        console.error("Error fetching data from Spotify API:", error);
        api.sendMessage("An error occurred while trying to fetch the Spotify song.", event.sender.id).catch(err => {
            console.error("Error sending message:", err);
        });
    }
};
