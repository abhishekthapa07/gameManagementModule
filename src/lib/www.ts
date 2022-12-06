import http from "http";
import { Application } from "express";
const debug = require("debug")("app");

/// Function to run server
export function runServer(app: Application, PORT: string): void {
  debug("Server configuration started.");
  /// Exit process if invalid PORT
  if (((PORT as unknown) as number) <= 0) {
    console.error("Port number must be number and > 0");
    return process.exit(1);
  }
  console.log("Running on port", PORT, `http://localhost:${PORT}`);
  /// set port to app
  app.set("port", PORT);
  /// create server
  const server = http.createServer(app);
  server.listen(PORT);
  /// Success listener
  server.on("listening", function onListening() {
    const addr = server.address();
    const bind =
      typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;
    debug("Listening on " + bind);
  });
  /// Error Listener
  server.on("error", function onError(error: any) {
    if (error.syscall !== "listen") {
      throw error;
    }
    /// handle specific listen errors with friendly messages
    switch (error.code) {
      case "EACCES":
        console.error(" requires elevated privileges");
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(PORT.toString() + " is already in use");
        process.exit(1);
        break;
      default:
        throw error;
    }
  });
}
