const Jimp = require("jimp");
const path = require("path");
const fsp = require("fs/promises");
const { UserModel } = require("../../database/models");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;
  const user = req.user;
  const fileName = `${user._id}_${originalname}`;

  const resultUpload = path.join(avatarsDir, fileName);
  Jimp.read(tempUpload, (error, avatar) => {
    if (error) throw error;
    avatar.resize(250, 250).write(tempUpload);
  });

  await fsp.rename(tempUpload, resultUpload);

  const avatarURL = path.join("avatars", fileName);
  await UserModel.findByIdAndUpdate(user._id, { avatarURL });

  res.status(201).json({ avatarURL });
};

module.exports = {
  updateAvatar,
};
