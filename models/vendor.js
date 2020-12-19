var mongoose = require("mongoose");
var crypto = require("crypto");
const {v4:uuidv4} = require("uuid");

var vendorSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required:true,
            maxlength:32,
            trim: true
        },
        lastname:{
            type: String,
            required:true,
            maxlength:32,
            trim: true
        },
        mobile:{
            type: Number,
            required:true,
            maxlength:10,
            trim: true,
            unique:true,
        },
        shopname: {
            type: String,
            maxlength:50,
            trim:true,
            required:true
        },
        shopAddress:{
            type: String,
            maxlength:500,
            trim:true,
        },
        email: {
            type: String,
            trim: true,
            required:true,
            unique:true,
        },
        encrypt_password: {
            type:String,
            required:true
        },
        salt: String,
    },
    { timestamps: true}
);

vendorSchema
    .virtual("password")
    .set(function(password){
        this._password = password;
        this.salt = uuidv4();
        this.encrypt_password = this.securePassword(password);
    })
    .get(function(){
        return this._password;
    });

vendorSchema.methods = {
    authenticate: function(plainpassword) {
        return this.securePassword(plainpassword) === this.encrypt_password;
    },

    securePassword: function(plainpassword) {
        if(!plainpassword) return "";
        try{
            return crypto
                .createHmac("sha256",this.salt)
                .update(plainpassword)
                .digest("hex");
        }catch(err){
            return "" ;
        }
    }
};

module.exports = mongoose.model("Vendor",vendorSchema);
