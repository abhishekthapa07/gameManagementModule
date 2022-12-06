import { model, Schema } from "mongoose";
import { IProfile } from "../interface";

const ProfileSchema = new Schema({
  field: {
    type: String,
    required: true,
    trim: true,
  },
});

export const Profile = model<IProfile>("Profile", ProfileSchema);
