import mongoose from "mongoose"

export const TODO_SCHEMA = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false,
    required: true,
  },
  timeStamp: {
    type: Date,
    default: Date.now
  }
})
