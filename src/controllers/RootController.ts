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
      const id = req.params.id;
      const gameToUpdate = await Module.findById(id);
      if (!gameToUpdate) {
        res.locals.errorMessage = "Game not found";
      }
      res.render("root/updateGame", { game: gameToUpdate });
    } catch (error) {
      res.locals.errorMessage = `${error}`;
      return res.redirect(req.originalUrl);
    }
  }

  @Post("/updateGame/:id")
  async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const gameId = req.params.id;
      const gameToUpdate = await Module.findById(gameId);
      if (!gameToUpdate) {
        res.locals.errorMessage = "Game not found";
        return res.redirect(req.originalUrl);
      }
      await Module.updateOne({ _id: gameId }, req.body, {
        runValidators: true,
      });
      res.redirect(req.originalUrl);
      res.locals.successMessage = "Category updated successfully";
    } catch (error) {
      res.locals.errorMessage = `${error}`;
    }
  }
  @Get("/generateLink/:id")
  async getGenerateLink(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const gameToUpdate = await Module.findById(id);
    if (!gameToUpdate) {
      res.locals.errorMessage = "Game not found";
      return res.redirect(req.originalUrl);
    }
    res.render("root/generateLink", { game: gameToUpdate });
  }
  @Post("/generateLink/:id")
  async linkGenerator(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const gameToUpdate = await Module.findById(id);
      if (!gameToUpdate) {
        res.locals.errorMessage = "Game not found";
        return res.redirect(req.originalUrl);
      }
      const { mode, level, players } = req.body;
      const link = `www.site.com?game_id=${id}&mode=${mode}&level=${level}&players=${players}`;
      gameToUpdate.link = link;
      await gameToUpdate.save({ validateBeforeSave: true, validateModifiedOnly: true });
    } catch (error) {
      res.locals.errorMessage = `${error}`;
    }
  }
}
