const axios = require("axios");

module.exports = function (event) {
  return function sendMessage(text, senderID) {
    const recipientID = senderID || event.senderID;

    function splitMessage(text) {
      const maxLength = 2000;
      const messages = [];
      let remainingText = text;

      while (remainingText.length > maxLength) {
        let splitIndex = remainingText.lastIndexOf("\n", maxLength);

        if (splitIndex === -1) {
          splitIndex = maxLength;
        } else {
          splitIndex += 1;
        }

        messages.push(remainingText.slice(0, splitIndex).trim());
        remainingText = remainingText.slice(splitIndex).trim();
      }

      messages.push(remainingText);
      return messages;
    }

    const messages = splitMessage(text);

    const sendPromises = messages.map(message => {
      const form = {
        recipient: { id: recipientID },
        message: { text: message },
        messaging_type: "RESPONSE",
      };

      return Graph(form);
    });

    return Promise.all(sendPromises)
      .then(results => results)
      .catch(err => ({ status: false, response: err.response ? err.response.data : err.message }));
  };

  function Graph(form) {
    return axios
      .post(
        `https://graph.facebook.com/v20.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
        form
      )
      .then((res) => ({ status: true, response: res.data }))
      .catch((err) => ({ status: false, response: err.response ? err.response.data : err.message }));
  }
};

// If an error occurs please contact Kenlie Navacilla Jugarap
// FB: https://www.facebook.com/kenlienjugarap