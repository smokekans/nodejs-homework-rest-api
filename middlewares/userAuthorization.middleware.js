const { UserModel } = require("../database/models");
const { createExcrptionHTTP, verifyJWT } = require("../services");

const userAuthorizationMiddleware = async (req, res, next) => {
  const unauthorizedMessage = "Unauthorized";

  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      throw createExcrptionHTTP(401, unauthorizedMessage);
    }

    const [bearer, token] = authorizationHeader.split(" ");
    if (bearer !== "Bearer" || !token) {
      throw createExcrptionHTTP(401, unauthorizedMessage);
    }

    try {
      const tokenPayload = verifyJWT(token);
      if (!tokenPayload.userId || !tokenPayload.sessionKey) {
        throw createExcrptionHTTP(401, unauthorizedMessage);
      }

      const user = await UserModel.findById(tokenPayload.userId);
      if (!user) {
        throw createExcrptionHTTP(401, unauthorizedMessage);
      }
      if (tokenPayload.sessionKey !== user.sessionKey) {
        throw createExcrptionHTTP(401, unauthorizedMessage);
      }

      req.user = user;
      next();
    } catch (error) {
      throw createExcrptionHTTP(401, unauthorizedMessage);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userAuthorizationMiddleware,
};
