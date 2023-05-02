const { UserModel } = require("../../database/models");
const crypto = require("crypto");
const { createUserSchema } = require("../../schemas");
const {
  createExcrptionHTTP,
  createHast,
  createJWT,
  sendEmailVerificationLatter,
} = require("../../services");
const gravatar = require("gravatar");

const register = async (req, res, next) => {
  const { email, password } = req.body;

  const { error } = createUserSchema.validate({ email, password });
  if (error) {
    throw createExcrptionHTTP(400, error.message);
  }

  const passwordHash = await createHast(password);
  const avatarURL = gravatar.url(email);
  const verificationToken = crypto.randomUUID();

  const newUser = await UserModel.create({
    email,
    passwordHash,
    avatarURL,
    verificationToken,
  }).catch((e) => {
    throw createExcrptionHTTP(409, "This email is already in use");
  });

  const sessionKey = crypto.randomUUID();

  await UserModel.findByIdAndUpdate(newUser.id, { sessionKey });

  const accessJWT = createJWT({ userId: String(newUser._id), sessionKey });

  const mail = {
    to: email,
    subject: "Your verification email",
    html: `<a href="http://localhost:3000/users/verify/${verificationToken}">Click to verify your email</a>`,
  };

  await sendEmailVerificationLatter(mail);

  res.status(201).json({
    token: accessJWT,
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: avatarURL,
      verificationToken,
    },
  });
};

module.exports = {
  register,
};
