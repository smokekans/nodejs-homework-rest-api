const express = require("express");
const authController = require("../controllers/auth");
const { controllerWrapper } = require("../services");
const { userAuthorizationMiddleware, upload } = require("../middlewares");

const router = express.Router();

router.post("/register", controllerWrapper(authController.register));
router.post("/login", controllerWrapper(authController.login));
router.post(
  "/logout",
  userAuthorizationMiddleware,
  controllerWrapper(authController.logout)
);
router.get(
  "/current",
  userAuthorizationMiddleware,
  controllerWrapper(authController.getCurrentUser)
);
router.get(
  "/verify/:verificationToken",
  controllerWrapper(authController.getVerificationToken)
);
router.post("/verify", controllerWrapper(authController.createVerify));
router.patch(
  "/avatars",
  userAuthorizationMiddleware,
  upload.single("avatar"),
  controllerWrapper(authController.updateAvatar)
);
router.patch(
  "/:id",
  userAuthorizationMiddleware,
  controllerWrapper(authController.updateSubscriptionUser)
);

module.exports = router;
