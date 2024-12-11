const axios = require("axios");

module.exports = function (event) {
  return function sendButton(text, buttons, senderID) {
    const recipientID = senderID || event.sender.id;

    const payload = buttons.map(button => ({
      type: button.type || 'postback',
      title: button.title,
      payload: button.payload || null,
      url: button.url || null,
    }));

    const form = {
      recipient: { id: recipientID },
      message: {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'button',
            text: text,
            buttons: payload,
          },
        },
      },
      messaging_type: "RESPONSE",
    };

    return Graph(form);
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