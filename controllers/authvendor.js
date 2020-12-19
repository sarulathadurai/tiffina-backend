const Vendor = require("../models/vendor");
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

    const vendor = new Vendor(req.body);

    vendor.save((err,vendor) => {
      if(err || !vendor){
        console.log(err);
        return res.status(400).json({
          err: "VENDOR VALUE CAN'T BE STORED",
          })
        }
      res.json({
        name: vendor.name,
        lastname:vendor.lastname,
        email: vendor.email,
        mobile:vendor.mobile,
        id: vendor._id,
      });
    });
};

exports.signin = (req,res) => {
    
    const errors = validationResult(req);
    const {mobile,password } = req.body;

    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg,
        });
    }

    Vendor.findOne({ mobile }, (err, vendor) => {
        if (err || !vendor) {
          return res.status(400).json({
            error: "vendor does not exists",
          });
        }
    
        if (!vendor.authenticate(password)) {
          return res.status(401).json({
            error: "Mobile No and Password do not match",
          });
        }

        const token = jwt.sign({ _id: vendor._id }, process.env.SECRET);
        res.cookie("token", token, { expire: new Date() + 9999 });

        const { _id,name,email } = vendor;
        return res.json({ token, vendor: { _id, name,email} });

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
      message: "Vendor Signout successfully!!",
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