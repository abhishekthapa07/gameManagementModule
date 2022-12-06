import { RequestHandler } from "express";

/**
 * This Middleware executes before all Routes
 *
 * Use this middleware to set data based on requirement
 */
export const beforeAllRoute: RequestHandler = function (req, res, next) {
  next();
};
