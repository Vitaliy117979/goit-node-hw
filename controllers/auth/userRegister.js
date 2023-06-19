const bcrypt = require("bcrypt");
const HttpError = require("../../helpers/HttpError");
const sendEmail = require ("../../helpers/sendEmail")
const User = require("../../models/user");
const gravatar = require("gravatar")
const {nanoid} = require("nanoid")
const verifyEmailData = require("../../helpers/verifyEmailData")
const {PROJECT_URL} = process.env

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw HttpError(409, "Email is use");
    }

    const createHashPassword = await bcrypt.hash(password, 10);
    const verificationToken = nanoid()
    const avatarURL = gravatar.url(email)
    const newUser = await User.create({
      ...req.body,
      password: createHashPassword,
      avatarURL,
      verificationToken
    });

  const verifyEmail = verifyEmailData(email, PROJECT_URL, verificationToken)
 
await sendEmail(verifyEmail)


    const subscription = req.body.subscription || "starter";
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription,
      },
    });
    
  } catch (error) {
    next(error);
  }
};

module.exports = { register };
