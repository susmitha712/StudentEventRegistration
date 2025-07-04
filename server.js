const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// ✅ CORS Configuration
const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET, POST",
    allowedHeaders: "Content-Type",
};
app.use(cors(corsOptions));

// ✅ Middleware
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serves uploaded images

// ✅ Routes (Ensure these are before `app.listen`)
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/eventRoutes"); // ✅ Import only once

app.use("/api/auth", authRoutes);   // Auth routes
app.use("/api/events", eventRoutes); // Event routes ✅ (Now works correctly)

// ✅ MongoDB Connection with Debugging
// const connectDB = async () => {
//     try {
//         console.log("Connecting to MongoDB...");
//         await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log("✅ MongoDB Connected");
//     } catch (err) {
//         console.error("❌ MongoDB Connection Error:", err.message);
//         process.exit(1); // Exit if connection fails
//     }
// };

const connectDB = async () => {
    try {
        console.log("Connecting to MongoDB...");
        console.log("MongoDB URI:", process.env.MONGO_URI); // Debugging Line
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB Connected Successfully");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1); // Exit if connection fails
    }
};

connectDB();

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
