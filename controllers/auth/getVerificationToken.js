const { UserModel } = require("../../database/models");
const { createExcrptionHTTP } = require("../../services");

const getVerificationToken = async (req, res, next) => {
  const { verificationToken } = req.params;
  const userVerification = await UserModel.findOne({ verificationToken });
  if (!userVerification) {
    throw createExcrptionHTTP(404, "User not found");
  }

  await UserModel.findByIdAndUpdate(userVerification._id, {
    verify: true,
    verificationToken: null,
  });

  res.status(201).json("Verification successful");
};

module.exports = {
  getVerificationToken,
};
