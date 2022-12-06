import mongoose from "mongoose";
import bluebird from "bluebird";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongod: MongoMemoryServer;

export async function connect() {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  /// Set promise
  // mongoose.Promise = bluebird;
  // Listen events
  mongoose.connection
    // .once("open", () => console.log("--Connection opened"))
    .on("close", () => console.log("--Connection closed"))
    .on("error", (error) => console.log(error));

  /// Connect and Return promise
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
}

export async function disconnect() {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
}
export async function clearData() {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
}
