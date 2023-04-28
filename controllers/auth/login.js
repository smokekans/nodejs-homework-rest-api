const { UserModel } = require("../../database/models");
const crypto = require("crypto");
const { createUserSchema } = require("../../schemas");
const { createExcrptionHTTP, createJWT, checkHash } = require("../../services");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const { error } = createUserSchema.validate({ email, password });
  if (error) {
    throw createExcrptionHTTP(400, error.message);
  }

  const user = await UserModel.findOne({ email });
  if (!user) {
    throw createExcrptionHTTP(404, "Email or password is wrong");
  }

  const match = await checkHash(password, user.passwordHash);
  if (!match) {
    res.status(401).json({ message: "Email or password is wrong" });
    return;
  }

  const sessionKey = crypto.randomUUID();
  await UserModel.findByIdAndUpdate(user.id, { sessionKey });

  const accessJWT = createJWT({
    userId: String(user._id),
    sessionKey,
  });

  res.json({
    token: accessJWT,
    user: { email: user.email, subscription: user.subscription },
  });
};

module.exports = {
  login,
};
