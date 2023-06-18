const path = require("path");
const Jimp = require("jimp");
const fs = require("fs/promises");
const User = require("../../models/user");
const avatarDir = path.join(__dirname, "../","../", "public", "avatars");


const updataAvatar = async (req, res, next) => {
  try {
    const {_id} = req.user
    const { path: tempUpload, filename } = req.file;
    
    const resultUpload = path.join(avatarDir, filename);
    await fs.rename(tempUpload, resultUpload);
    await Jimp.read(resultUpload)
      .then((image) => {
        return image.resize(250, 250).write(resultUpload);
      });


    const avatarURL = path.join("avatars", filename)

    await User.findByIdAndUpdate(_id, {avatarURL})
    res.json({
        avatarURL
    })
  } catch (error) {
    next(error);
  }
};

module.exports = {updataAvatar}
