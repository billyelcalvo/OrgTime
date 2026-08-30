import bcrypt from 'bcrypt';
import "dotenv/config";

const salt : string = process.env.SALT!

export const hashPassword = async (password : string) =>{
        return await bcrypt.hash(password,salt);
}
export const hashCompare = async (password : string, encryptedPassword : string) =>{
    return await bcrypt.compare(password, encryptedPassword);
}