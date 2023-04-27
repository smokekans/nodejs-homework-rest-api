const { createContactSchema } = require("./createContact.schema");
const { createUserSchema } = require("./createUser.schema");
const { updateContactSchema } = require("./updateContact.schema");
const { updateStatusContactSchema } = require("./updateStatusContact.schema");

module.exports = {
  createContactSchema,
  createUserSchema,
  updateContactSchema,
  updateStatusContactSchema,
};
