const { ContactModel } = require("../../database/models");
const { createExcrptionHTTP } = require("../../services");

async function deleteContact(req, res, next) {
  const { id } = req.params;
  const result = await ContactModel.findByIdAndDelete(id).catch((error) => {
    throw createExcrptionHTTP(400, error.message);
  });

  if (!result) {
    throw createExcrptionHTTP(404, "This contact is not found");
  }

  res.status(200).json({ message: "Contact deleted" });
}

module.exports = {
  deleteContact,
};
