const { ContactModel } = require("../../database/models");
const { updateStatusContactSchema } = require("../../schemas");
const { mapContactOutput, createExcrptionHTTP } = require("../../services");

async function updateStatusContact(req, res, next) {
  const { id } = req.params;
  const { favorite } = req.body;

  const { error } = updateStatusContactSchema.validate({ favorite });
  if (error) {
    throw createExcrptionHTTP(400, "Missing fields");
  }

  const updateStatus = await ContactModel.findByIdAndUpdate(
    id,
    {
      favorite,
    },
    { new: true }
  ).catch((error) => {
    throw createExcrptionHTTP(400, error.message);
  });

  if (!updateStatus) {
    throw createExcrptionHTTP(404, "This contact is not found");
  }
  const mappedContact = mapContactOutput(updateStatus);
  res.json(mappedContact);
}

module.exports = {
  updateStatusContact,
};
