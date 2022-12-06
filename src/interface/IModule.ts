import { Document } from "mongoose";

export interface IModule {
  name: string;
  source: string;
  category: string;
  link: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IModuleModel extends IModule, Document {}
