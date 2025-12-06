import { NextFunction, Request, Response } from "express";


 const logger = (req :Request,res:Response,next : NextFunction) => {
    console.log("this is middleware");


}

export default logger;