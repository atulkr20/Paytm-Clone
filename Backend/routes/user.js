const express = require("express");
const { z } = require("zod");
const { User, Account } = require("../db");
const { authMiddleware } = require("../auth/middleware");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");

const router = express.Router();

const signupBody = z.object({
    email: z.string().email(),
    firstName: z.string().max(50).trim(),
    lastName: z.string().max(50).trim(),
    password: z.string().min(6)
});

router.post("/signup", async (req, res) => {
    const userDetails = req.body;
    const parsed = signupBody.safeParse(req.body);

    if (!parsed.success) {
        return res.status(411).json({ message: "incorrect inputs" });
    }

    const user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(411).json({ message: "User already exists" });
    }

    const createdUser = await User.create(userDetails);
    const userId = createdUser._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    });

    const token = jwt.sign({ userId }, JWT_SECRET);

    res.json({ message: "User created Successfully", token });
});

const signinBody = z.object({
    email: z.string().email(),
    password: z.string()
});

router.post("/signin", async (req, res) => {
    const parsed = signinBody.safeParse(req.body);
    if (!parsed.success) {
        return res.status(411).json({ message: "Incorrect inputs" });
    }

    const user = await User.findOne({ email: req.body.email, password: req.body.password });
    if (user) {
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        return res.json({ token });
    }

    res.status(411).json({ message: "Error while Logging in" });
});

router.post("/logout", authMiddleware, (req, res) => {
    res.status(200).json({ message: "Logged out successfully. Please remove the token from client storage." });
});

const updateBody = z.object({
    password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional()
});

router.put("/user", authMiddleware, async (req, res) => {
    const parsed = updateBody.safeParse(req.body);

    if (!parsed.success) {
        return res.status(411).json({ message: "Error while updating information" });
    }

    const updatedDoc = await User.findOneAndUpdate({ _id: req.userId }, req.body);
    if (updatedDoc)
        res.json({ message: "Updated Successfully" });
    else
        res.json({ message: "Error while updating information" });
});

router.get("/bulk", authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";
    const users = await User.find({
        $or: [
            { firstName: { $regex: filter } },
            { lastName: { $regex: filter } }
        ]
    });

    res.json({
        users: users.map(user => ({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    });
});

router.get("/me", authMiddleware, async (req, res) => {
    const user = await User.findById(req.userId).select("firstName lastName email");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
});

module.exports = router;
