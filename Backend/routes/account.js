const express = require("express");
const mongoose = require("mongoose");
const { authMiddleware } = require("../auth/middleware");
const { Account } = require("../db");

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const account = await Account.findOne({ userId: req.userId });
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    res.json({ balance: account.balance });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { amount, to } = req.body;

    if (!amount || amount <= 0) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Invalid amount" });
    }

    if (to.toString() === req.userId.toString()) {
      await session.abortTransaction();
      return res.status(400).json({ message: "You cannot send money to yourself" });
    }

    const account = await Account.findOne({ userId: req.userId }).session(session);
    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Insufficient balance" });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);
    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Invalid recipient account" });
    }

    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    await session.commitTransaction();
    res.json({ message: "Transfer successful" });
  } catch (err) {
    await session.abortTransaction();
    res.status(500).json({ message: "Transaction failed", error: err.message });
  } finally {
    session.endSession();
  }
});

module.exports = router;
