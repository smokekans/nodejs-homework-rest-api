const { UserModel } = require("../../database/models");
const {
  updateSubscriptionUserSchema,
} = require("../../schemas/updateSubscriptionUser.schema");
const { createExcrptionHTTP, mapContactOutput } = require("../../services");

const updateSubscriptionUser = async (req, res, next) => {
  const { id } = req.params;
  const { subscription } = req.body;

  const { error } = updateSubscriptionUserSchema.validate({ subscription });
  if (error) {
    throw createExcrptionHTTP(400, "The subscription field is missing");
  }

  const updateSubscription = await UserModel.findByIdAndUpdate(
    id,
    { subscription },
    { new: true }
  ).catch((error) => {
    throw createExcrptionHTTP(400, error.message);
  });

  if (!updateSubscription) {
    throw createExcrptionHTTP(404, "Сontact not found");
  }

  const mappedContact = mapContactOutput(updateSubscription);
  res.json(mappedContact);
};

module.exports = {
  updateSubscriptionUser,
};
