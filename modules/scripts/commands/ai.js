const axios = require('axios'); 

module.exports.config = {
    name: "ai", 
    author: "Chael",
    version: "1.0",
    category: "Chatbot",
    description: "Conversational A.I",
    adminOnly: false, 
    usePrefix: true, 
    cooldown: 5, 
};

module.exports.run = async function ({ event, args }) {
    try {
        // Join the command arguments into a single user query string
        const userQuery = args.join(" ");

        // Make an API request to fetch the response from the GPT-4 API
        const response = await axios.get(`https://markdevs-last-api-vtjp.onrender.com/api/v3/gpt4?ask=${encodeURIComponent(userQuery)}`);

        // Check if the response contains valid data
        if (response.data && response.data.status) {
            const message = response.data.answer; 

            // Send the API response message to the user
            api.sendMessage(message, event.sender.id).catch(err => {
                console.error("Error sending message:", err);
            });
        } else {
            // If the API response doesn't have the expected data, send an error message
            api.sendMessage("Failed to fetch data from the API.", event.sender.id).catch(err => {
                console.error("Error sending message:", err);
            });
        }
    } catch (error) {
        // If an error occurs while fetching data from the API, send an error message
        console.error("Error fetching data from API:", error);
        api.sendMessage("An error occurred while trying to fetch data.", event.sender.id).catch(err => {
            console.error("Error sending message:", err);
        });
    }
};
