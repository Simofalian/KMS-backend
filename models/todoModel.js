const mongoose = require("mongoose");
const Scheman = mongoose.Scheman();
const todoSchema = new Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  itemName: { type: String, required: true },

  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  finished: {
    type: bolean,
    default: false,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

modeule.exports = Todo;
