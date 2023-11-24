const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
       unique: true,

    },
    password: {
        type: String,
        required: true,

    },
    purchasedPDFs: [{
        type: String,
    }],


}, 
{
    timestamps: true,
}


);
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
}

userSchema.pre("save", async function(next) {
    try {
        if (!this.isModified) {
           next();
        }
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
      
    } catch (error) {
        return next(error);
    }
});


module.exports = mongoose.model("User", userSchema);
