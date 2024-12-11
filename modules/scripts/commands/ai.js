const axios = require('axios'); // Make sure to install axios using npm if not already installed

module.exports.config = {
    name: "ai", // command name
    author: "Chael",
    version: "1.0",
    category: "Chatbot",
    description: "Ask anything with A.I",
    adminOnly: false, // if false all users can use this command but if true only the admin id lists on config.json can use
    usePrefix: true, // if true it uses the command with the prefix example /fetchsendtext but if false no need prefix can direct use fetchsendtext
    cooldown: 5, // cooldown on how many commands can be used
};

module.exports.run = async function ({ event, args }) {
    try {
        // Get the user's message
        const userQuery = args.join(" "); // Combine all arguments into a single query string

        // Fetch response from the provided API with the user's query
        const response = await axios.get(`https://api.joshweb.click/api/mixtral-8b?q=${encodeURIComponent(userQuery)}`);
        
        if (response.data && response.data.status) {
            const message = response.data.result; // Extract the message from the API response
            
            // Send the fetched message to the user
            api.sendMessage(message, event.sender.id).catch(err => {
                console.error("Error sending message:", err);
            });
        } else {
            // Handle cases where the API response is not as expected
            api.sendMessage("Failed to fetch data from the API.", event.sender.id).catch(err => {
                console.error("Error sending message:", err);
            });
        }
    } catch (error) {
        // Handle errors during the API request
        console.error("Error fetching data from API:", error);
        api.sendMessage("An error occurred while trying to fetch data.", event.sender.id).catch(err => {
            console.error("Error sending message:", err);
        });
    }
};
