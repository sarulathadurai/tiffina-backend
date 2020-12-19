const User = require("../models/user");
const { validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

require("dotenv").config();

exports.signup = (req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg,
        });
    }

    const user = new User(req.body);

    user.save((err,user) => {
      if(err || !user){
        console.log(err);
        return res.status(400).json({
          err: "USER VALUE CAN'T BE STORED",
          })
        }
      res.json({
        name: user.name,
        lastname:user.lastname,
        email: user.email,
        username: user.username,
        id: user._id,
      });
    });
};

exports.signin = (req,res) => {
    
    const errors = validationResult(req);
    const { email,password,username } = req.body;

    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg,
        });
    }

    User.findOne({ username }, (err, user) => {
        if (err || !user) {
          return res.status(400).json({
            error: "USER does not exists",
          });
        }
    
        if (!user.authenticate(password)) {
          return res.status(401).json({
            error: "Email and password do not match",
          });
        }

        const token = jwt.sign({ _id: user._id }, process.env.SECRET);
        res.cookie("token", token, { expire: new Date() + 9999 });

        const { _id, name, email, username } = user;
        return res.json({ token, user: { _id, name,email,username } });

});
}


exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    algorithms: ['HS256'],
    userProperty: "auth",
  });
  
  //protected route
  exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
      message: "User Signout successfully!!",
    });
  };
  
  //custom route
  exports.isAuthenticated = (req, res, next) => {
    let checker = req.auth && req.profile && req.profile._id == req.auth._id;
    if (!checker) {
      return res.status(403).json({
        error: "Access Denied",
      });
    }
    next();
  };