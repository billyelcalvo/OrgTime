import prisma from "../index"
import {Request, Response} from "express";
import {UserSchema, CreateUserSchema} from "../model/user";
import { hashPassword, hashCompare} from "../services/bcryptService"

export const register = async (req: Request, res: Response)=>{
    const result = CreateUserSchema.safeParse({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    });

    if(!result.success){
        return res.status(400).send({msg : "User cannot be created"});
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
            return res.status(201).send();// TO-DO: Return a jwt
        }
        catch(e){
            return res.status(400).send({msg : "User cannot be created"});
        }

    }
};

export const login = async (req : Request, res: Response)=>{
    const result = CreateUserSchema.safeParse(
        {
            data:{
                //TO-DO: Probably need to create or change schemas for login and register
            }
        })
}
