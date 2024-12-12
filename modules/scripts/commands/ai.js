const axios = require('axios'); // Import Axios for HTTP requests

module.exports.config = {
    name: "ai", // Command name
    author: "Chael", // Author of the command
    version: "1.0", // Version of the command
    category: "Chatbot", // Category of the command
    description: "Conversational A.I", // Description of the command
    adminOnly: false, // Whether this command is restricted to admins
    usePrefix: true, // Whether the command requires a prefix
    cooldown: 5, // Cooldown time (seconds) before the command can be reused
};

module.exports.run = async function ({ event, args, api }) {
    try {
        // Combine the arguments into a single query string
        const userQuery = args.join(" ");

        // Send the query to the external API
        const response = await axios.get(
            `https://markdevs-last-api-vtjp.onrender.com/api/v3/gpt4?ask=${encodeURIComponent(userQuery)}`
        );

        // Process the API response
        if (response.data && response.data.status) {
            const message = response.data.answer; // Extract the answer from the response

            // Send the message back to the user
            api.sendMessage(message, event.sender.id).catch((err) => {
                console.error("Error sending message:", err);
            });
        } else {
            // If API does not return a valid response
            api.sendMessage("Failed to fetch data from the API.", event.sender.id).catch((err) => {
                console.error("Error sending message:", err);
            });
        }
    } catch (error) {
        // Handle errors during the API call or response processing
        console.error("Error fetching data from API:", error);
        api.sendMessage("An error occurred while trying to fetch data.", event.sender.id).catch((err) => {
            console.error("Error sending message:", err);
        });
    }
};
