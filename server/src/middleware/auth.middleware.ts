import * as jwt from "jsonwebtoken";
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from "express";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class auth implements NestMiddleware {
  constructor(private readonly configService: ConfigService) { }

  use(req: Request, res: Response, next: NextFunction) {

    const token = req.headers.authorization;
    console.log(req.body)
    const JWT_SECRET = this.configService.get<string>("JWT_SECRET");

    if (token && JWT_SECRET) {
      console.log(JWT_SECRET)
      try {
        next();
      } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid token" });
      }
    } else {
      return res.status(401).json({ success: false, message: "Token not provided" });
    }
  }
}

export default auth;
