const express = require("express");
const contactsController = require("../../controllers/contacts");
const { userAuthorizationMiddleware } = require("../../middlewares");

const router = express.Router();

router.get("/", userAuthorizationMiddleware, contactsController.getContacts);

router.get("/:id", userAuthorizationMiddleware, contactsController.getContact);

router.post("/", userAuthorizationMiddleware, contactsController.createContact);

router.put(
  "/:id",
  userAuthorizationMiddleware,
  contactsController.updateContact
);

router.patch(
  "/:id/favorite",
  userAuthorizationMiddleware,
  contactsController.updateStatusContact
);

router.delete(
  "/:id",
  userAuthorizationMiddleware,
  contactsController.deleteContact
);

module.exports = router;
