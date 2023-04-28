const { ContactModel } = require("../../database/models");
const { mapContactOutput } = require("../../services");

async function getContacts(req, res, next) {
  const { _id: owner } = req.user;
  const { page, limit, favorite } = req.query;

  const searchCriteries = { owner };

  if (favorite) {
    searchCriteries.favorite = favorite;
  }

  const contacts = await ContactModel.find(searchCriteries, null, {
    skip: (page - 1) * limit,
    limit,
  }).populate("owner", "email subscription");

  const mappedContact = contacts.map(mapContactOutput);
  res.json(mappedContact);
}

module.exports = {
  getContacts,
};
