const axios = require("axios");

module.exports = function (event) {
  return function sendTypingIndicator(isTyping, userId) {
    const senderAction = isTyping ? "typing_on" : "typing_off";
    const form = {
      recipient: {
        id: userId || event.sender.id,
      },
      sender_action: senderAction,
    };

    return Graph(form)
      .then((response) => ({ status: true, response }))
      .catch((err) => ({ status: false, response: err.response ? err.response.data : err.message }));
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