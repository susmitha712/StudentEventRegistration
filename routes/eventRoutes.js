const express = require("express");
const Event = require("../models/Event");
const upload = require("../middleware/upload");

const router = express.Router();

// ✅ Event creation route
router.post("/create", upload.single("image"), async (req, res) => {
    try {
        console.log("Incoming POST request to /create");
        console.log("Received event data:", req.body);
        console.log("Received file:", req.file);

        if (!req.file) {
          console.log("❌ Error: No image provided");
          return res.status(400).json({ message: "Image is required" });
        }

        const { title, description, date, eventLink} = req.body;
        console.log("Extracted eventLink:", eventLink);

        const imagePath = `/uploads/${req.file.filename}`;

        const event = new Event({
            title,
            description,
            date,
            imageUrl: imagePath,
            eventLink,
        });

        await event.save();
        res.status(201).json({ message: "Event created successfully!" });
    } catch (error) {
        console.error("Backend Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

router.get("/", async (req, res) => {
  try {
    const events = await Event.find(); // Get all events from MongoDB
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Failed to fetch events" });
  }
});
module.exports = router;
