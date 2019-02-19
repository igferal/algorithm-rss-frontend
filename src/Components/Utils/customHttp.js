const customAxios = require("axios");
if (localStorage.getItem("token") !== null) {
  customAxios.defaults.headers.common = { Authorization: `Bearer ${localStorage.getItem("token")}` };
}

export default customAxios;
