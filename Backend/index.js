require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./db");

const rootRouter = require("./routes/index");
const userRouter = require("./routes/user");
const accountRouter = require("./routes/account");

const app = express();

// Allowed origins
// Use CORS_ORIGIN or CORS_ORIGINS (comma-separated). Default to localhost dev ports.
const allowedOrigins = (
  process.env.CORS_ORIGINS ||
  process.env.CORS_ORIGIN ||
  "http://localhost:5173,http://127.0.0.1:5173"
)
  .split(",")
  .map(o => o.trim())
  .filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    // Support Vite preview which often uses http://localhost:4173
    if (origin && /localhost:(5173|4173)$/.test(origin)) {
      return callback(null, true);
    }
    console.log("Blocked by CORS:", origin);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204
}));

// JSON body parser
app.use(express.json());

// Routes
app.use("/api/v1", rootRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/account", accountRouter);

// Health checks
app.get("/", (_req, res) => res.send("Backend is up. See API under /api/v1"));
app.get("/health", (_req, res) => res.json({ ok: true }));

// Catch-all for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, _req, res, _next) => {
  console.error("Server error:", err.message);
  res.status(500).json({ message: err.message || "Internal Server Error" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
