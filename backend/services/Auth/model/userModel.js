import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firebaseUid: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    username: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true
    },
    avatar: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

export  default  Usermodel = mongoose.model("User", userSchema)
