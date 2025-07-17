import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    select: false
  },
  role: {
    type: String,
    enum: ['student', 'problemSolver', 'admin'],
    required: true,
    default: 'student'
  },
  image: {
    type: String
  },
  googleId: {
    type: String,
  },

}, { timestamps: true });

export const User = mongoose.models?.User || mongoose.model("User", userSchema)