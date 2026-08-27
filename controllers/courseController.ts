import { Request, Response } from "express";
import {CourseSchema} from "../model/course"
import prisma from "../index";

export const getAllCourses = async (req : Request, res : Response) =>{
    const result = await prisma.course.findMany()
    return res.status(200).send(result);
}
export const getCourseById = async(req : Request, res : Response) =>{
    try{
        const result = await prisma.course.findUnique({
        where: {id : String(req.params.id)}
        })
        return res.status(202).send(result);
    }
    catch(e){
        return res.status(404).send({msg : "Course not found"});
    }

    
}
export const createCourse = async(req: Request, res: Response) =>{
    const result = CourseSchema.safeParse({
        name: req.body.name, 
        initTime: req.body.initTime , 
        finalTime: req.body.finalTime});
    
        if(!result.success){
            return res.status(400).send({msg: "Object cannot be created"});
        }
        else{
            try{
                await prisma.course.create({data: {
                name : result.data.name,
                initTime: result.data.initTime,
                finalTime: result.data.finalTime
            }});
            return res.status(201).send(result.data);

            }catch(e){
                return res.status(400).send({msg: "Object cannot be created"});
            }

        }
}
export const deleteCourse = async(req: Request, res: Response) =>{
    try{
        await prisma.course.delete({where : {id : String(req.params.id)} });
        res.status(200);
    }
    catch(e){
        res.status(400).send({msg : "Object not found"});
    }
    
}
export const updateCourse = async(req: Request, res: Response) =>{
    try{
        const result = CourseSchema.safeParse({
            id : String(req.params.id),
            name: req.body.name,
            initTime: req.body.initTime,
            finalTime: req.body.finalTime
        });
        if(!result.success){
            res.status(400);
        }
        else{
            await prisma.course.update({
                where: { id : result.data.id},
                data: {
                    name: result.data.name,
                    initTime:result.data.initTime,
                    finalTime: result.data.finalTime
                }
            })
            res.status(200).send(result.data);
        }
    }
    catch(e){
        res.status(400).send({msg: "Object cannot be modifier"});
    }
}