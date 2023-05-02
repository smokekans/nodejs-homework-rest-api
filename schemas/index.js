const { createContactSchema } = require("./createContact.schema");
const { createUserSchema } = require("./createUser.schema");
const { createVerifySchema } = require("./createVerify.schema");
const { updateContactSchema } = require("./updateContact.schema");
const { updateStatusContactSchema } = require("./updateStatusContact.schema");
const {
  updateSubscriptionUserSchema,
} = require("./updateSubscriptionUser.schema");

module.exports = {
  createContactSchema,
  createUserSchema,
  createVerifySchema,
  updateContactSchema,
  updateStatusContactSchema,
  updateSubscriptionUserSchema,
};
