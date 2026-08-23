import "dotenv/config";

const rawJwtSecret = process.env.JWT_SECRET;

if (!rawJwtSecret) {
    throw new Error("JWT_SECRET is not defined");
}

const rawRefreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

if(!rawRefreshTokenSecret){
    throw new Error ("REFRESH_TOKEN_SECRET is not defined")
}


export const jwtSecret: string = rawJwtSecret;
export const refreshTokenSecret: string = rawJwtSecret;