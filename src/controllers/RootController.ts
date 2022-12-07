import { NextFunction, Request, Response } from "express";
import { Controller, Get, IRouteParams, Post, Put } from "@softcripto/express";
import { Module } from "../models";

@Controller("/")
export class RootController {
  static children: Array<IRouteParams> = []; /// required
  /// Home page
  @Get("/")
  async index(req: Request, res: Response, next: NextFunction) {
    const gamesList = await Module.find({});
    res.render("root/home", { AllGames: gamesList });
  }
  @Get("/updateGame/:id")
  async getGame(req: Request, res: Response, next: NextFunction) {
    try {
      const gameId = req.params.id;
      const gameToUpdate = await Module.findById(gameId);
      if (!gameToUpdate) {
        req.flash("error", `Game not found with id ${gameId}`);
        return res.redirect("/");
      }
      res.render("root/updateGame", { game: gameToUpdate });
    } catch (error) {
      req.flash("error", `${error}`);
      return res.redirect("/");
    }
  }

  @Post("/updateGame/:id")
  async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const gameId = req.params.id;
      const gameToUpdate = await Module.findById(gameId);
      if (!gameToUpdate) {
        req.flash("error", `Game not found with id ${gameId}`);
        return res.redirect(req.originalUrl);
      }
      await Module.updateOne({ _id: gameId }, req.body, {
        runValidators: true,
      });
      req.flash("success", `Game category updated successfully`);
      return res.redirect(req.originalUrl);
    } catch (error) {
      req.flash("error", `${error}`);
      return res.redirect(req.originalUrl);
    }
  }

  @Get("/generateLink/:id")
  async getGenerateLink(req: Request, res: Response, next: NextFunction) {
    try {
      const gameId = req.params.id;
      const gameToUpdate = await Module.findById(gameId);
      if (!gameToUpdate) {
        req.flash("error", `Game not found with id ${gameId}`);
        return res.redirect("/");
      }
      res.render("root/generateLink", { game: gameToUpdate });
    } catch (error) {
      req.flash("error", `${error}`);
      return res.redirect("/");
    }
  }

  @Post("/generateLink/:id")
  async linkGenerator(req: Request, res: Response, next: NextFunction) {
    try {
      const gameId = req.params.id;
      const gameToUpdate = await Module.findById(gameId);
      if (!gameToUpdate) {
        req.flash("error", `Game not found with id ${gameId}`);
        return res.redirect(req.originalUrl);
      }
      const { mode, level, players } = req.body;
      const link = `www.site.com?game_id=${gameId}&mode=${mode}&level=${level}&players=${players}`;
      gameToUpdate.link = link;
      await gameToUpdate.save({ validateBeforeSave: true, validateModifiedOnly: true });
      req.flash("success", `Link generated successfully`);
      return res.redirect(req.originalUrl);
    } catch (error) {
      req.flash("error", `${error}`);
      return res.redirect(req.originalUrl);
    }
  }
}
