// create middle ware function for checking token available or not

import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
const auth = (...roles: string[]) => {
    const secret = config.jwt_secret;

    return async (req: Request, res: Response, next: NextFunction) => {

        try {
            const token = req.headers.authorization;
            console.log({ token });
            if (!token) {
                return res.status(500).json({ message: "You are not allowed" })
            }
            const decoded = jwt.verify(token, secret as string) as JwtPayload
            console.log({ "decoded text": decoded });

            req.user = decoded

            if (roles.length && !roles.includes(decoded.role as string)) {

                // ["admin"]
                return res.status(500).json({
                    sucess: false,
                    message: "unauthorized!!!"
                })


            }
            next()
        } catch (error: any) {
            res.status(500).json({
                sucess: false,
                message: error.message
            })
        }
    }
}
export default auth;