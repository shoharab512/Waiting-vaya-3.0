import mongoose from "mongoose";

const solveSchema = new mongoose.Schema(
  {
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    image: {
      type: String,
    },
    message: {
      type: String,
      required: true,
    },
    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
    },
  },
  { timestamps: true }
);

export const Solve =
  mongoose.models?.Solve || mongoose.model("Solve", solveSchema);
