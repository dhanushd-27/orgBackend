import mongoose, { Schema } from "mongoose";

const OrgSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  logo: { type: String },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  members: [
    {
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      role: { type: String, enum: ["Owner", "Admin", "Member"], default: "Member" }
    }
  ]
});

export const OrgModel = mongoose.model("Organization", OrgSchema);