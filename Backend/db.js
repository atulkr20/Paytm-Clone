const mongoose = require("mongoose");

main().catch(err => console.log("Error Connecting to MongoDB"));

async function main() {
    await mongoose.connect("mongodb+srv://atulkrjha59_db_user:CjsYpWHEtb5yp6W7@cluster0.yzo4umv.mongodb.net/");
    console.log("Connected to MongoDB");

    // Drop old username index if it exists
    await User.collection.dropIndex("username_1").catch(err => {
        if (err.code === 27) { // index not found
            console.log("Old username index not found, skipping…");
        } else {
            throw err;
        }
    });

    // Sync indexes for email unique constraint
    await User.syncIndexes();
    console.log("Indexes synced successfully!");
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
