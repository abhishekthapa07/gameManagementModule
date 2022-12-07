require("dotenv").config();
import mongoose from "mongoose";
import database from "./_database";
const debug = require("debug")("app");
import { Module } from "../models";
import { IModule } from "@/interface";

debug("Database connection started.");

/*
 * Connecting to database
 * When connected configure server
 */

database(process.env.DATABASE as string, process.env.NODE_ENV as string)
  .then(async () => {
    mongoose.connection.db.dropDatabase().then((res) => {
      if (res) {
        console.log("Database dropped successfully");
      }
    });

    // insert games
    const games = getGamesObj();
    await Module.insertMany(games);
    console.log("Games entry done");
  })
  .catch((err) => {
    console.log("err", err);
  });

// Create list of Games object
function getGamesObj() {
  const categoryList = ["Race", "Puzzle", "Simulation", "sports", "Action", "Multiplayer"];
  const gamesList = [];
  for (let index = 1; index < 20; index++) {
    const game: IModule = {
      name: `Game-${index + 1}`,
      source: `Source-${Math.floor(Math.random() * 10) + 1}`,
      category: categoryList[Math.floor(Math.random() * 5)],
      link: `www.games.com/Game-${index + 1}/${categoryList[Math.floor(Math.random() * 5)]}`,
    };
    gamesList.push(game);
  }

  return gamesList;
}
