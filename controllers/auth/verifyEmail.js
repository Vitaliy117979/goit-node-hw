const HttpError = require("../../helpers/HttpError");
const User = require("../../models/user");
const verifyEmailData = require("../../helpers/verifyEmailData");
const sendEmail = require("../../helpers/sendEmail");
const { PROJECT_URL } = process.env;

const verifyEmail = async (req, res, next) => {
    console.log(1);
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
      throw HttpError(404, "User not found");
    }
    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: "",
    });
    res.json({
      massege: "Verification successful",
    });
  } catch (error) {
    next(error);
  }
};

const resendEmailVerify = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user.verify) {
      throw HttpError(400, "Verification has already been passed");
    }
    const verifyEmail = verifyEmailData(
      email,
      PROJECT_URL,
      user.verificationToken
    );
    await sendEmail(verifyEmail);
    res.json({
      message: "Verification email sent",
    });

  } catch (error) {
    next(error);
  }
};

module.exports = { verifyEmail, resendEmailVerify };
