import { NextFunction, Request, Response } from "express";
import { Controller, Get, IRouteParams, Post, Put } from "@softcripto/express";
import { Module } from "../models";
import linkGenerator from "../helper/linkGenerator";

@Controller("/")
export class RootController {
  static children: Array<IRouteParams> = []; /// required
  /**
   * Get all game list from database and render in browser
   */
  @Get("/")
  async index(req: Request, res: Response, next: NextFunction) {
    const gamesList = await Module.find({});
    res.render("root/home", { AllGames: gamesList });
  }

  /**
   * Get game of given id from database and render in browser
   * If not found show error message stating not found
   * Get All games from database and provide to hbs for showing in dropdown of game list
   */
  @Get("/updateGame/:id")
  async getGame(req: Request, res: Response, next: NextFunction) {
    try {
      const gameId = req.params.id;
      const gameToUpdate = await Module.findById(gameId);
      if (!gameToUpdate) {
        req.flash("error", `Game not found with id ${gameId}`);
        return res.redirect("/");
      }
      const gamesList = await Module.find({});
      res.render("root/updateGame", { game: gameToUpdate, gameList: gamesList });
    } catch (error) {
      req.flash("error", `${error}`);
      return res.redirect("/");
    }
  }

  /**
   * check if data is coming from selected game or dropdown List
   * search game using id in database ,if not found return with not found message
   * Update field of game and return success message
   */
  @Post("/updateGame/:id")
  async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      let gameId;
      req.params.id == "dropdown_list" ? (gameId = req.body.game) : (gameId = req.params.id);
      const gameToUpdate = await Module.findById(gameId);
      if (!gameToUpdate) {
        req.flash("error", `Game not found with id ${gameId}`);
        return res.redirect(req.originalUrl);
      }
      await Module.updateOne({ _id: gameId }, req.body, {
        runValidators: true,
      });
      req.flash("success", `Game category updated successfully`);
      res.redirect(`/updateGame/${gameId}`);
    } catch (error) {
      req.flash("error", `${error}`);
      return res.redirect(req.originalUrl);
    }
  }

  /**
   * Get game of given id from database and render in browser
   * If not found show error message stating not found
   * Get All games from database and provide to hbs for showing in dropdown of game list
   */
  @Get("/generateLink/:id")
  async getGenerateLink(req: Request, res: Response, next: NextFunction) {
    try {
      const gameId = req.params.id;
      const gameToUpdate = await Module.findById(gameId);
      if (!gameToUpdate) {
        req.flash("error", `Game not found with id ${gameId}`);
        return res.redirect("/");
      }
      const gamesList = await Module.find({});
      res.render("root/generateLink", { game: gameToUpdate, gameList: gamesList });
    } catch (error) {
      req.flash("error", `${error}`);
      return res.redirect("/");
    }
  }

  /**
   * check if data is coming from selected game or dropdown List
   * search game using id in database ,if not found return with not found message
   * send form data and id to helper function to generate valid link
   * Update link of game and return success message
   */
  @Post("/generateLink/:id")
  async linkGenerator(req: Request, res: Response, next: NextFunction) {
    try {
      let gameId;
      req.params.id == "dropdown_list" ? (gameId = req.body.game_id) : (gameId = req.params.id);
      const gameToUpdate = await Module.findById(gameId);
      if (!gameToUpdate) {
        req.flash("error", `Game not found with id ${gameId}`);
        return res.redirect(req.originalUrl);
      }
      const link = linkGenerator(req.body, gameId);
      gameToUpdate.link = link;
      await gameToUpdate.save({ validateBeforeSave: true, validateModifiedOnly: true });
      req.flash("success", `Link generated successfully`);
      res.redirect(`/generateLink/${gameId}`);
    } catch (error) {
      req.flash("error", `${error}`);
      return res.redirect(req.originalUrl);
    }
  }
}
