const express = require("express");
const router = express.Router();

const { getVendorById, getVendor} = require("../controllers/vendor");
const { isSignedIn, isAuthenticated } = require("../controllers/authvendor");

router.param("vendorId", getVendorById);

router.get("/vendor/:vendorId", isSignedIn, isAuthenticated, getVendor);

module.exports = router;