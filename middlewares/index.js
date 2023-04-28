const { errorHandlingMiddleware } = require("./errorHandling.middleware");
const {
  userAuthorizationMiddleware,
} = require("./userAuthorization.middleware");

module.exports = {
  errorHandlingMiddleware,
  userAuthorizationMiddleware,
};
