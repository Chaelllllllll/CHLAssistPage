module.exports.config = {
    name: "testreplydata", // Command name
    author: "Kenlie Jugarap",
    version: "1.0",
    category: "test",
    description: "Get Reply Message Data",
    adminOnly: false, // if false all users can use this command but if true only the admin id lists on config.json can use
    usePrefix: true, // if true it uses the command with the prefix example /testsendimage-url but if false no need prefix can direct use testsendimage-url
    cooldown: 5, // cooldown on how many command to be used
};

module.exports.run = async function ({ event, args }) {
    try {
        const { message, sender } = event;
        if (message.reply_to) {
            const replyMid = message.reply_to.mid;

            try {
                const replyData = await api.messageReply(replyMid);
                const responseMessage = `Reply MessageID: ${replyMid}\n\nData:\n${JSON.stringify(event, null, 2)}\n\nReply Message Data:\n${JSON.stringify(replyData, null, 2)}`;
                api.sendMessage(responseMessage, sender.id);
            } catch (err) {
                console.error("Error fetching reply data:", err);
                api.sendMessage("Error fetching reply message data.", sender.id);
            }
        } else {
            api.sendMessage("Please reply to a message first, to get its corresponding data.", sender.id);
        }
    } catch (err) {
        console.error("Error in command execution:", err);
        api.sendMessage("An error occurred while processing the command.", event.sender.id);
    }
};