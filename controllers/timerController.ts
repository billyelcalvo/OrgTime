import { Request, Response } from "express";
import prisma from "../index"
import {TimerSchema} from "../model/timer"
export const getAllTimers = async (req : Request, res : Response) =>{
    const result = await prisma.timer.findMany();
    res.status(200).send(result); 
}
export const getTimerById = async(req : Request, res : Response) =>{
    const result = await prisma.timer.findUnique({where : {id : String(req.params.id)}});
    return res.status(200).send(result);
}
export const createTimer = async(req: Request, res: Response) =>{
    const result = TimerSchema.safeParse({
        name : req.body.name,
        hours : req.body.hours,
        minutes : req.body.minutes,
        seconds : req.body.seconds,
        userId: req.body.userId
    });
    if(!result.success){
        return res.status(400).send({msg: "Timer cannot be created"});
    }
    else{
        try{
            await prisma.timer.create({
                data:{
                    name: result.data.name,
                    hours: result.data.hours,
                    minutes: result.data.minutes,
                    seconds: result.data.seconds,
                    userId: result.data.userId
                }
            });  
            return res.status(201).send(result.data);    
        }catch(e){
           return res.status(400).send({msg: "Timer cannot be created"});
        }
    }
}
export const deleteTimer = async(req: Request, res: Response) =>{
    try{
        await prisma.timer.delete({where: {id : req.body.id}})
        return res.status(200).send();
    }
    catch(e){
        return res.status(400).send({msg: "Timer cannot be deleted"})
    }
}
export const updateTimer = async(req: Request, res: Response) =>{
        const result = TimerSchema.safeParse({
        id: String(req.params.id),
        name : req.body.name,
        hours : req.body.hourse,
        minutes : req.body.minutes,
        seconds : req.body.secods
    });
    if(!result.success){
        return res.status(400).send({msg: "Timer cannot be modifier"});
    }
    else{
        try{
            await prisma.timer.update({
                where : {id : result.data.id},
                data:{
                    name: result.data.name,
                    hours: result.data.hours,
                    minutes: result.data.minutes,
                    seconds: result.data.seconds
                }
            });  
            return res.status(200).send(result.data);    
        }catch(e){
           return res.status(400).send({msg: "Timer cannot be modifier"});
        }
    }
}