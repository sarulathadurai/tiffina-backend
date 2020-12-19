var mongoose = require("mongoose");
var crypto = require("crypto");
const {v4:uuidv4} = require("uuid");

var userSchema = new mongoose.Schema(
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
        username:{
            type: String,
            required:true,
            maxlength:32,
            trim: true,
            unique:true,
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

userSchema
    .virtual("password")
    .set(function(password){
        this._password = password;
        this.salt = uuidv4();
        this.encrypt_password = this.securePassword(password);
    })
    .get(function(){
        return this._password;
    });

userSchema.methods = {
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

module.exports = mongoose.model("User",userSchema);
