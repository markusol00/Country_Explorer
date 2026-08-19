import "dotenv/config";

const rawJwtSecret = process.env.JWT_SECRET;

if (!rawJwtSecret) {
    throw new Error("JWT_SECRET is not defined");
}


export const jwtSecret: string = rawJwtSecret;