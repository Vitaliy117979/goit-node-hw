

const verifyEmailData  = (email, PROJECT_URL, verificationToken ) => {
  const data = { to: email,
    subject: "Varify email",
    html: `<a target="_blank" href="${PROJECT_URL}/users/verify${verificationToken}">Click to verify email</a>`}
    return data
  }

  module.exports = verifyEmailData
