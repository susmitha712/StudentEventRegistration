// const mongoose = require("mongoose");

// const EventSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   date: String,
//   imageUrl: String, // Store image path
// });

// module.exports = mongoose.model("Event", EventSchema);

const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    imageUrl: { type: String, required: true },
    eventLink: {type:String,required:true},
});

module.exports = mongoose.model("Event", eventSchema);
