import * as jwt from "jsonwebtoken";
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from "express";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class auth implements NestMiddleware {
  constructor(private readonly configService: ConfigService) { }

  use(req: Request, res: Response, next: NextFunction) {
    console.log("Requesting...");

    const authHeader = req.headers.authorization;
    const JWT_SECRET = this.configService.get<string>("JWT_SECRET");

    if (authHeader && JWT_SECRET) {
      const token = authHeader.split(' ')[1]; // Extract token after "Bearer"
      try {
        const verify = jwt.verify(token, JWT_SECRET);
        console.log(verify); // decoded payload (e.g., email)
        next();
      } catch (error) {
        console.log("Invalid token:", error);
        return res.status(401).json({ success: false, message: "Invalid token" });
      }
    } else {
      return res.status(401).json({ success: false, message: "Token not provided" });
    }
  }
}

export default auth;
