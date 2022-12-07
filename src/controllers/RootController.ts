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
    }
  }

  
}
