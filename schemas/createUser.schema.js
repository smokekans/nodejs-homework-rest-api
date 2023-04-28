const Joi = require("joi");
const { USER_RULE } = require("../enums");
const { regPassword } = require("../regexp");
const { regEmail } = require("../regexp");

const createUserSchema = Joi.object({
  email: Joi.string().email(regEmail).required(),
  password: Joi.string().pattern(new RegExp(regPassword)).required(),
  subscription: Joi.string()
    .default(USER_RULE.STARTER)
    .valid(...Object.values(USER_RULE)),
});

module.exports = {
  createUserSchema,
};
