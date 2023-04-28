const { register } = require("./register");
const { login } = require("./login");
const { logout } = require("./logout");
const { getCurrentUser } = require("./getCurrentUser");
const { updateSubscriptionUser } = require("./updateSubscriptionUser");

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
  updateSubscriptionUser,
};
