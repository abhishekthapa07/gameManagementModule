/**
 * Main file to configure and run express server
 *
 * @packageDescription
 */

require("dotenv").config();

import app from "./app";
import { runServer } from "./lib/www";
import database from "./lib/_database";
/*
 * Connecting to database
 * When connected configure server
 */
database(process.env.DATABASE as string, process.env.NODE_ENV as string)
  .then(() => {
    runServer(app(), process.env.PORT as string);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1); // Doesn't run server
  });
