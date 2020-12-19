const express = require('express');
const router = express.Router();
const {getAllProducts} = require("../controllers/product");
const {isSignedIn,isAuthenticated} = require("../controllers/authvendor");


router.get("/products",getAllProducts);

module.exports = router;
