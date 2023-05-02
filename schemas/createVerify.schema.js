const Joi = require("joi");
const { regEmail } = require("../regexp");

const createVerifySchema = Joi.object({
  email: Joi.string().email(regEmail),
});

module.exports = {
  createVerifySchema,
};
