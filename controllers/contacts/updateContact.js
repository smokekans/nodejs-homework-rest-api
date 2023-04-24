const { updateContactSchema } = require("../../schemas");
const { ContactModel } = require("../../database/models");
const { mapContactOutput } = require("./services");

async function updateContact(req, res, next) {
  try {
    const { id } = req.params;
    const { name, email, phone, favorire } = req.body;

    const { error } = updateContactSchema.validate({
      name,
      email,
      phone,
      favorire,
    });
    if (error) {
      const err = new Error("Missing fields");
      err.code = 400;
      throw err;
    }

    const updateContact = await ContactModel.findByIdAndUpdate(
      id,
      {
        name,
        email,
        phone,
        favorire,
      },
      { new: true }
    ).catch((error) => {
      const err = Error(error.message);
      err.code = 400;
      throw err;
    });

    if (!updateContact) {
      const err = new Error("This contact is not found");
      err.code = 404;
      throw err;
    }

    const mappedContact = mapContactOutput(updateContact);
    res.status(200).json(mappedContact);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  updateContact,
};
