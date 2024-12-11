const axios = require("axios");

module.exports = function (event) {
  return function graph(form) {
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