const { getContacts } = require("./getContacts");
const { getContact } = require("./getContact");
const { createContact } = require("./createContact");
const { deleteContact } = require("./deleteContact");
const { updateContact } = require("./updateContact");

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
};
