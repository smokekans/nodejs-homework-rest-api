const { updateContactSchema } = require("../../schemas");
const { ContactModel } = require("../../database/models");
const { mapContactOutput, createExcrptionHTTP } = require("../../services");

async function updateContact(req, res, next) {
  const { id } = req.params;
  const { name, email, phone, favorite } = req.body;

  const { error } = updateContactSchema.validate({
    name,
    email,
    phone,
    favorite,
  });
  if (error) {
    throw createExcrptionHTTP(400, "Missing fields");
  }

  const updateContact = await ContactModel.findByIdAndUpdate(
    id,
    {
      name,
      email,
      phone,
      favorite,
    },
    { new: true }
  ).catch((error) => {
    throw createExcrptionHTTP(400, error.message);
  });

  if (!updateContact) {
    throw createExcrptionHTTP(404, "This contact is not found");
  }

  const mappedContact = mapContactOutput(updateContact);
  res.status(200).json(mappedContact);
}

module.exports = {
  updateContact,
};
