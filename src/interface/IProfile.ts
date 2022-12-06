import { Document } from "mongoose";

export interface IProfile {
  key: string;
}

export interface IProfileModel extends IProfile, Document {}
