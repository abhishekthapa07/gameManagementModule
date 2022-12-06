import { NextFunction, Request, Response } from "express";
import { Controller, Get, IRouteParams, Post } from "@softcripto/express";

@Controller("/")
export class RootController {
  static children: Array<IRouteParams> = []; /// required
  /// Home page
  @Get("/")
  async index(req: Request, res: Response, next: NextFunction) {
    res.render("root/home");
  }
}
