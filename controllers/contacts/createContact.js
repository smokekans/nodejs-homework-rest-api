const { createContactSchema } = require("../../schemas");
const { ContactModel } = require("../../database/models");
const { mapContactOutput, createExcrptionHTTP } = require("../../services");

async function createContact(req, res, next) {
  const user = req.user;
  const { name, email, phone, favorite } = req.body;

  const { error } = createContactSchema.validate({
    name,
    email,
    phone,
  });
  if (error) {
    throw createExcrptionHTTP(400, error.message);
  }

  const newContact = await ContactModel.create({
    name,
    email,
    phone,
    favorite,
    owner: user,
  });

  const mappedContact = mapContactOutput(newContact);
  res.status(201).json(mappedContact);
}

module.exports = {
  createContact,
};
