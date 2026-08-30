import * as jwt from "jsonwebtoken";
import "dotenv/config"

export const jwtSign =  (email : string)=>{
    return jwt.sign({data: email}, process.env.SECRET!, {expiresIn: "2h"})
};

export const jwtVerify = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET!);
    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error("Token expirado");
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error("Token inválido");
    }
    throw error;
  }
};
