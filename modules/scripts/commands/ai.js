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
        const userQuery = args.join(" ");

        const response = await axios.get(`https://markdevs-last-api-vtjp.onrender.com/api/v3/gpt4?ask=${encodeURIComponent(userQuery)}`);
        
        if (response.data && response.data.status) {
            const message = response.data.answer; 
            
            api.sendMessage(message, event.sender.id).catch(err => {
                console.error("Error sending message:", err);
            });
        } else {
            api.sendMessage("Failed to fetch data from the API.", event.sender.id).catch(err => {
                console.error("Error sending message:", err);
            });
        }
    } catch (error) {
        console.error("Error fetching data from API:", error);
        api.sendMessage("An error occurred while trying to fetch data.", event.sender.id).catch(err => {
            console.error("Error sending message:", err);
        });
    }
};
