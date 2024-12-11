module.exports.config = {
    name: "testnoneedreplyattachmentsdata", // command name
    author: "Kenlie Jugarap",
    version: "1.0",
    category: "test",
    description: "Test sends the attachment data without replying it", // description of the command
    adminOnly: false, // if false all users can use this command but if true only the admin id lists on config.json can use
    usePrefix: true, // if true it uses the command with the prefix example /testsendimage-url but if false no need prefix can direct use testsendimage-url
    cooldown: 5, // cooldown on how many command to be used
};

module.exports.run = async function ({ event, args }) {
    if (event.message.attachments && event.message.attachments.length > 0) {
        api.sendMessage(JSON.stringify(event, null, 2), event.sender.id).catch(err => {
            console.log(err);
        });
    } else {
        api.sendMessage("Please send an image first to get a sample response of attachment without replying it", event.sender.id).catch(err => {
            console.log(err);
        });
    }
};