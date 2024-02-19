const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    confirmpassword: {
        type: String,
        require: true,
    }
})


userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign ({
           userID: this._id.toString(),
           email: this.email,
           isAdmin: this.isAdmin 
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "1d",
        }
        )
    }
    catch (error) {
        console.error(error)
    }
  };

// comparePassword
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };
const User = new mongoose.model("User", userSchema)
module.exports = User;