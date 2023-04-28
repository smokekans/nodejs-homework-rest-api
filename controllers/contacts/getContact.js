const { ContactModel } = require("../../database/models");
const { mapContactOutput, createExcrptionHTTP } = require("../../services");

async function getContact(req, res, next) {
  const { id } = req.params;
  const contacts = await ContactModel.findById(id).catch((error) => {
    throw createExcrptionHTTP(400, error.message);
  });

  if (!contacts) {
    throw createExcrptionHTTP(404, "This contact is not found");
  }

  const mappedContact = mapContactOutput(contacts);
  res.json(mappedContact);
}

module.exports = {
  getContact,
};
