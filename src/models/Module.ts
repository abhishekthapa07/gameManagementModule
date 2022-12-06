import { model, Schema } from "mongoose";
import { IModule } from "../interface";
import validator from "validator";

const ModuleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    source: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["Race", "Puzzle", "Simulation", "sports", "Action", "Multiplayer"],
      required: true,
    },
    link: {
      type: String,
      validate: {
        validator: validator.isURL,
        message: "invalid Link for game",
      },
    },
  },
  {
    timestamps: true,
  }
);

export const Module = model<IModule>("Module", ModuleSchema);
