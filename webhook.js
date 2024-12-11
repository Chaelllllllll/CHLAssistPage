const config = require("./config.json");
const utils = require("./modules/utils");

module.exports.listen = function (event) {
  try {
    if (event.object === "page") {
      event.entry.forEach((entry) => {
        entry.messaging.forEach(async (event) => {
          event.type = await utils.getEventType(event);

          global.PAGE_ACCESS_TOKEN = config.PAGE_ACCESS_TOKEN;

          // Blocks responding to the bot's own messages
          if (config.selfListen && event?.message?.is_echo) return;
          utils.log(event);

          require("./page/main")(event);
        });
      });
    }
  } catch (error) {
    console.error(error);
  }
};