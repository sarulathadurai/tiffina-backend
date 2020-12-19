//dotenv
require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');


//Routes
const authuserRoutes = require("./routes/authuser.js");
const userRoutes = require("./routes/user");
const authvendorRoutes = require("./routes/authvendor.js");
const vendorRoutes = require("./routes/vendor");
const productRoutes = require("./routes/product");

//Connection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => {
        console.log("DB CONNECTED");
    })

//Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

//My Routes

app.use("/tiffina", authuserRoutes);
app.use("/tiffina", userRoutes);
app.use("/tiffina", authvendorRoutes);
app.use("/tiffina", vendorRoutes);
app.use("/tiffina", productRoutes);

//Port
const port = 8000;

//Server start
app.listen(port, () => {
    console.log(`app is running ${port}`);
})