const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "help",
  author: "Kenlie Jugarap",
  version: "1.0",
  category: "utility",
  description: "Sends a back greeting message and lists all commands and events.",
  adminOnly: false,
  usePrefix: true,
  cooldown: 5
};

module.exports.run = function ({ event, args }) {
  if (event.type === "message" || event.postback.payload === "HELP_PAYLOAD") {
    const commandsPath = path.join(__dirname, "../commands");

    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".js"));

    const categorizedCommands = {};

    // Categorize commands
    commandFiles.forEach((file) => {
      const command = require(path.join(commandsPath, file));
      if (command.config) {
        const category = command.config.category || "Uncategorized";
        if (!categorizedCommands[category]) {
          categorizedCommands[category] = [];
        }
        categorizedCommands[category].push(`${command.config.usePrefix ? PREFIX : ""}${command.config.name}`);
      }
    });

    // Construct the message
    let message = "";
    Object.keys(categorizedCommands).forEach((category) => {
      message += `◙◙ ${category} ◙◙\n`;
      categorizedCommands[category].forEach((command) => {
        message += `• ${command}\n`;
      });
      message += "\n";
    });

    // Send the message to the user
    api.sendMessage(message, event.sender.id);
  }
};