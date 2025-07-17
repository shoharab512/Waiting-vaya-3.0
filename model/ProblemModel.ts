import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted'],
    required: true,
    default: 'Pending'
  },
  image: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    default:"No message provided..."
    // required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  chapter: {
    type: String,
    required: true,
  },
},{timestamps:true});

export const Problem =
  mongoose.models?.Problem || mongoose.model("Problem", problemSchema);
