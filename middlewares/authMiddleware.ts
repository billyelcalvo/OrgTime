import {Request, Response, NextFunction} from 'express';
import {jwtVerify} from '../services/jwtService'
export const authMiddleware = (req: Request, res: Response, next : NextFunction)=>{
    const header = req.headers.authorization
    if(!header) return res.status(401).send();
    try{
    const token = header.split(" ")[1] 
    const decode = jwtVerify(token);

    if(decode.data.email != req.body.email){
        return res.status(400).send({msg: "An Error occur while trying to verify the token"});
    }
    next();
    }catch(e){
        return res.status(400).send({msg: "An Error occur while trying to verify the token"});
    }

}

