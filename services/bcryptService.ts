import bcrypt from 'bcrypt';
import "dotenv/config";

const salt : string = process.env.SALT!

export const hashPassword = (password : string) =>{
        return bcrypt.hash(password,salt);
}