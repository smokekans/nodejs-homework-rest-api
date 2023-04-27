const Joi = require("joi");
const { USER_RULE } = require("../enums");

const updateSubscriptionUserSchema = Joi.object({
  subscription: Joi.string()
    .default(USER_RULE.STARTER)
    .valid(...Object.values(USER_RULE)),
});

module.exports = {
  updateSubscriptionUserSchema,
};
