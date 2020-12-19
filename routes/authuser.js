var express = require("express");
var router = express.Router();
const {check} = require("express-validator");
const { signout,signup,signin} = require("../controllers/authuser");

router.post(
    "/user/signup",
    [
      check("name", "name should be at least 3 characters").isLength({ min: 3 }),
      check("lastname", "name should be at least 3 characters").isLength({ min: 3 }),
      check("email", "email is required").isEmail(),
      check("username","username should be atleast 4 characters").isLength({min:4}),
      check("password", "password should be at least 3 char")
      .isLength({ min: 3 })
      .matches(/\d/).withMessage('password must contain Number,special charater,one uppercase and lowercase letter'),
      
    ],
    signup
  );
  
  router.post(
    "/user/signin",
    [
      check("username", "username is required").isLength({min:4}),
      check("password", "password field is required").isLength({ min: 3 })
    ],
    signin
  );
  
  router.get("/user/signout", signout);
  
  module.exports = router;