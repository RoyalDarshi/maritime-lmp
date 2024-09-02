const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  topics: [
    {
      title: String,
      content: String,
      order: Number,
    },
  ],
});

module.exports = mongoose.model("Course", courseSchema);
