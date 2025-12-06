import {  Request, Response } from "express"
import { authService } from "./auth.servicet"



const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const result = await authService.loginUser(email, password);
        res.status(200).json({
            sucesss: true,
            message: "login sucessfull",
            data: result
        })
    } catch (error: any) {
        res.status(500).json(
            {
                sucess: false,
                message: error.message
            }
        )
    }
}

export const authController = {
    loginUser,
}