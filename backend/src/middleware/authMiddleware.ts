import type {  Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config.js"

//Type for a request that includes userId
export type AuthRequest = Request & {
    userId?: number
}


export function authMiddleware(
    request: AuthRequest,
    response: Response,
    next: NextFunction
){

    const authHeader = request.headers.authorization;
    if (!authHeader){
        return response.status(401).json({
            message: "No authorization header"
        });
    }
    const parts = authHeader.split(" ")
    const token = parts[1];
    if (!token){
        return response.status(401).json({
            message: "No token found"
        })
    }
    try {
        const decoded = jwt.verify(
        token,
        jwtSecret
    );
     if (typeof decoded === "string" || !decoded.userId){
        return response.status(401).json({
            message: "Invalid token"
        })
    }
    request.userId = decoded.userId;

    console.log(decoded);
    
    }
    catch(error){
        return response.status(401).json({
            message: "Token expired or invalid token"
        })
    }

    next();
}