const mongoose = require("mongoose");

// Support both MONGODB_URI and MONGO_URI; prefer MONGODB_URI
const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI || "";

main().catch(err => console.log("Error Connecting to MongoDB"));

async function main() {
    if (!mongoUri) {
        throw new Error("Missing Mongo connection string (MONGODB_URI or MONGO_URI)");
    }
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");
}

// User schema
const userSchema = new mongoose.Schema({
    email: {
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

const User = mongoose.model('User', userSchema);

// Account schema
const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model("Account", accountSchema);

module.exports = {
    User,
    Account
};
