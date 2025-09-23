const mongoose = require("mongoose");
main().catch(err=>console.log("Error Connecting to MongoDB"));

async function main() {
    await mongoose.connect("mongodb+srv://atulkrjha59_db_user:CjsYpWHEtb5yp6W7@cluster0.yzo4umv.mongodb.net/");
    console.log("Connected to MongoDB")
}

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },

    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const User = mongoose.model('User',userSchema);

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true

    },
    balance:{
        type: Number,
        required: true
    }
});

const Account = mongoose.model("Account", accountSchema);

module.exports ={
    User,
    Account
};