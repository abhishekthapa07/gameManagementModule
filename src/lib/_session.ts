import session from "express-session";
// import flash from "connect-flash";
const MongoStore = require("connect-mongo")(session);
import { Application } from "express";
const mongoose = require("mongoose"); //intentionally required

/// Use session middleware
/// Use flash middleware
export default function (app: Application, secret: string): void {
  /// Session option
  const options: session.SessionOptions = {
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    })
  };
  /// Only Production options
  if (app.get("env") === "production") {
    app.set("trust proxy", 1);
    options.cookie = {
      secure: true,
    };
  }
  /// add to app
  app.use(session(options));
  // app.use(flash());
}
