const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            trim:true,
            required:true,
            maxlength:32,
        },
        description:{
            type:String,
            trim:true,
            maxlength:1000,
        },
        price:{
            type:Number,
            required:true,
            maxlength:32

        }
    },
    {timestamps:true}
);

module.exports = mongoose.model("Product",productSchema);