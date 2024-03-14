// src\auth\middlewares\auth.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService) { }

    async use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return next();
        }

        try {
            const decoded = await this.jwtService.verify(token);
            req.user = decoded;
        } catch (err) {
            return next(err);
        }

        next();
    }
}