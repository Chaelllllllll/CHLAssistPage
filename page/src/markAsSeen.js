const axios = require("axios");

module.exports = function (event) {
  return function markAsSeen(boolean, senderId) {
    const form = {
      recipient: {
        id: senderId || event.sender.id,
      },
      sender_action: boolean ? "mark_seen" : "mark_unread",
    };

    return axios
      .post(
        `https://graph.facebook.com/v20.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
        form
      )
      .then((res) => ({ status: true, response: res.data }))
      .catch((err) => ({ status: false, response: err.response ? err.response.data : err.message }));
  };
};

// If an error occurs please contact Kenlie Navacilla Jugarap
// FB: https://www.facebook.com/kenlienjugarap