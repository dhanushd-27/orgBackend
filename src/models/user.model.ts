import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  organizations: { type: [
    {
      orgId: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
      role: { type: String, enum: ["Owner", "Admin", "Member"], required: true },
    },
  ], required: false},
});

export const UserModel = mongoose.model("User", UserSchema);