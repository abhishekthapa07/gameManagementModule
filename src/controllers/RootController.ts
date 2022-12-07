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
  
}
