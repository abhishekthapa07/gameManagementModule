import { Server } from "@softcripto/express";
import { Application } from "express";
import session from "./lib/_session";
import { beforeAllRoute } from "./middlewares/beforeAllRoute";
import { loadFlash } from "./middlewares/loadFlashMessage";

const robots = require("express-robots-txt");
// load all controllers that handles http request
import "./controllers";

export default function app(): Application {
  // Initialising Express App with @softcripto/express
  return Server.create({
    views: "views",
    public: "public",

    // Run code just before Route mount
    beforeRouteInjection: function (app: Application) {
      app.use(robots({ UserAgent: "*", Disallow: "/" }));

      // Set session and flash middleware
      session(app, process.env.SESSION_SECRET as string);

      // Add middleware before all route
      app.all("*", beforeAllRoute);
      app.all("*", loadFlash);
    },
  });
}
