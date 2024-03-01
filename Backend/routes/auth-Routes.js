const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-Controllers")
const validate = require("../middlewares/validate-middleware");
const signupSchema = require("../validators/auth-Validator");
// const schemas = require("../validators/auth-Validator");
const authMiddleware = require("../middlewares/auth-Middleware")


// Best Way



router.route("/").get(authController.home); // controller method
router.route("/register").post(validate(signupSchema), authController.register);
// router.route("/register").post(validate(signupSchema), authController.register);
// router.route("/update").put(authController.updateSettings);

router.route("/login").post(authController.login);

router.route("/user").get(authMiddleware, authController.user);
router.route('/update-password').put(authMiddleware, authController.updateSettings);


  module.exports = router;