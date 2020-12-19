const Vendor = require("../models/vendor");


exports.getVendorById = (req,res,next,id) => {

    Vendor.findById(id).exec((err,vendor) => {
        if(err || !vendor){
            return res.status(400).json({
                error:"No vendor was found"
            });
        }
        req.profile = vendor;
        next();
    });
};

exports.getVendor = (req, res) => {

    req.profile.salt = undefined;
    req.profile.mobile = undefined;
    req.profile.encryp_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile);
  };