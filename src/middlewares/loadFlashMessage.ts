import { RequestHandler } from "express";

/**
 * This Middleware executes before all Routes
 * Use this middleware to set locals flash data messages based on requirement
 *
 * Below I have set local flash messages data so it can be excute in templete on routing.
 */
export const loadFlash: RequestHandler = function (req, res, next) {
    res.locals.successMessage = req.flash("success");
    res.locals.errorMessage = req.flash("error");
    res.locals.infoMessage = req.flash("info");
    next();
};
