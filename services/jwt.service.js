const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRES_IN_SECONDS } = process.env;

const createJWT = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: `${JWT_EXPIRES_IN_SECONDS} seconds`,
  });
  return token;
};

const verifyJWT = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = {
  createJWT,
  verifyJWT,
};
