const { register } = require("./register");
const { login } = require("./login");
const { logout } = require("./logout");
const { getCurrentUser } = require("./getCurrentUser");
const { getVerificationToken } = require("./getVerificationToken");
const { createVerify } = require("./createVerify");
const { updateSubscriptionUser } = require("./updateSubscriptionUser");
const { updateAvatar } = require("./updateAvatar");

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
  getVerificationToken,
  createVerify,
  updateSubscriptionUser,
  updateAvatar,
};
