const { UserModel } = require("../../database/models");
const { createVerifySchema } = require("../../schemas");
const {
  createExcrptionHTTP,
  sendEmailVerificationLatter,
} = require("../../services");

const createVerify = async (req, res, next) => {
  const { email } = req.body;
  const { error } = createVerifySchema.validate({ email });
  if (error) {
    throw createExcrptionHTTP(400, "Missing field");
  }

  const user = await UserModel.findOne({ email });
  if (!user) {
    throw createExcrptionHTTP(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Your verification link",
    html: `<a href="http://localhost:3000/auth/verify/${user.verificationToken}">Click to verify your email</a>`,
  };

  await sendEmailVerificationLatter(verifyEmail);

  res.status(201).json("Verify email send success");
};

module.exports = {
  createVerify,
};
