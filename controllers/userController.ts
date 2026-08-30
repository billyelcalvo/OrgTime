import prisma from "../index"
import {Request, Response} from "express";
import {UserSchema, CreateUserSchema} from "../model/user";
import { hashPassword, hashCompare} from "../services/bcryptService"
import {jwtSign} from "../services/jwtService"

export const register = async (req: Request, res: Response)=>{
    const result = CreateUserSchema.safeParse({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    });

    if(!result.success){
        return res.status(400).json({msg : "User cannot be created"});
    }
    else{
        try{
            const passwordHashed = await hashPassword(result.data.password);
            await prisma.user.create({
                data : {
                    name: result.data.name,
                    email: result.data.email,
                    password: passwordHashed
                }
            });
            return res.status(201).json({
                token: jwtSign(result.data.email)
            });
        }
        catch(e){
            return res.status(400).json({msg : "User cannot be created"});
        }

    }
};

export const login = async (req : Request, res: Response)=>{
    const result = CreateUserSchema.safeParse(
        {
            data:{
                email: req.body.email,
                password: req.body.password
            }
        });
    if(!result.success){
        return res.status(400).json({msg: "Email or password is incorrect. Try again or create an account"});
    }
        try{
            const user = await prisma.user.findUnique({
                where: {
                    email : result.data.email
                }
            });
            if(!user){
                return res.status(400).json({msg: "Email or password is incorrect. Try again or create an account"});
            }
            const verify = await hashCompare(result.data.password, user.password);
            if(!verify){
                return res.status(400).json({msg: "Email or password is incorrect. Try again or create an account"});
            }
            return res.status(200).json({
                token: jwtSign(result.data.email)
            })

        }catch(e){
            return res.status(400).json({msg: "Email or password is incorrect. Try again or create an account"});
        }
}
