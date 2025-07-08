import jwt from "jsonwebtoken"
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from "express";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class auth implements NestMiddleware {
  constructor(private readonly configService: ConfigService) { }
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization
    const JWT_SECRET = this.configService.get<string>("JWT_SECRET")
    try {
      if (token && JWT_SECRET) {
        jwt.verify(token, JWT_SECRET)
      }
      next()
    } catch (error) {
      res.json({ success: false, message: "Invalid token" })
    }
  }
}
export default auth