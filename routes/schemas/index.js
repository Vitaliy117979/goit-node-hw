const {
  createContact,
  updateContact,
  updateFavoriteSchema,
} = require("./contacts");

const { registerSchema, loginSchema, userEmailSchema } = require("./users");

module.exports = {
  createContact,
  updateContact,
  updateFavoriteSchema,
  registerSchema,
  loginSchema,
  userEmailSchema
};
