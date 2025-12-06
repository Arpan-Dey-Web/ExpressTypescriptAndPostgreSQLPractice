import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userServices } from "./user.service";


const createUser = async (req: Request, res: Response) => {
    const { name, email } = req.body;
    try {
        const result = await userServices.createUser(name, email);
        res.status(201).json({
            sucess: true,
            message: "Data inserted Sucessfully"
        })
    } catch (error: any) {
        res.status(500).json({
            sucess: false,
            message: error.message
        })
    }

}

const getAllUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getAllUser();

        res.status(200).json({
            sucess: true,
            message: 'users retrived sucessfully',
            data: result.rows
        })
    } catch (error: any) {
        res.status(500).json({
            sucess: false,
            message: error.message
        }
        )
    }
}

const getSingleUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await userServices.getSingleUser(id as string)
        res.status(200).json({
            sucess: true,
            message: 'users retrived sucessfully',
            data: result.rows
        })
    } catch (error: any) {
        res.status(500).json({
            sucess: false,
            message: error.message
        }
        )
    }
}

const updateUserData = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const result = await pool.query(`UPDATE users SET name=$1, email=$2 WHERE id = $3 RETURNING *`, [name, email, id]);

        if (result.rows.length === 0) {
            res.status(404).json({ sucess: false, message: "user not found" })
        } else {
            res.status(200).json({ sucess: true, message: "User Updated Sucessfully", data: result.rows[0] })
        }
    } catch (error: any) {
        res.status(404).json({ sucess: false, message: error.message })
    }

}



const deleteUserData = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await userServices.deleteUserData(id as string);

        if (result.rowCount === 0) {
            res.status(404).json({
                sucess: false,
                message: 'user not found'
            })
        } else {
            res.status(200).json({
                sucess: true,
                message: 'user Deleted sucessfully',
                data: null,

            })
        }
    } catch (error: any) {
        res.status(500).json({ sucess: false, message: error.message })

    }

}



export const userControllers = {
    createUser, getAllUser, getSingleUser, updateUserData, deleteUserData
};