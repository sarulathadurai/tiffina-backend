var express = require("express");
var router = express.Router();
const {check} = require("express-validator");
const { signout,signup,signin} = require("../controllers/authvendor");

router.post(
    "/vendor/signup",
    [
      check("name", "name should be at least 3 characters").isLength({ min: 3 }),
      check("lastname", "name should be at least 3 characters").isLength({ min: 3 }),
      check("email", "email is required").isEmail(),
      check("mobile", "mobile no is required").isLength({min:10}),
      check("password", "password should be at least 3 char")
      .isLength({ min: 3 })
      .matches(/\d/).withMessage('password must contain Number,special charater,one uppercase and lowercase letter'),
      
    ],
    signup
  );
  
  router.post(
    "/vendor/signin",
    [
      check("mobile", "mobile no is required").isLength({min:10}),
      check("password", "password field is required").isLength({ min: 3 })
    ],
    signin
  );
  
  router.get("/vendor/signout", signout);
  
  module.exports = router;