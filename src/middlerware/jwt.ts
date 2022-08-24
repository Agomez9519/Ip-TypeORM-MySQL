import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

export const checkJwt=(req:Request,res:Response,next:NextFunction) =>{
    //creamos una variable que recibe como parametro el token en el header del request
    const token = <string> req.headers['auth'];
    console.log(token);
    let jwtPayload;

    try {
        //el jwtPayLoad guarda las variablees de la sesion (id, username, y el tiempo de ciclo de vida del token)
        jwtPayload = jwt.verify(token,config.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
        console.log(jwtPayload);
    } catch (error) {
        return res.status(401).json({
            message:'Error: TOKEN NO AUTORIZADO',
            error
        })
    }

    const {userId, username} = jwtPayload
    const newToken = jwt.sign({userId,username},config.jwtSecret,{expiresIn:'1h'})

    res.setHeader('auth',newToken);
    next();
}