import { Request, Response } from "express";
import { pool } from "../../config/db";
import { todoService } from "./todo.service";



const createTodo = async (req: Request, res: Response) => {
    const { user_id, title } = req.body;
    try {
        const result = await todoService.createTodo(user_id, title);
        res.status(201).json({ sucess: true, message: "Todo Created ", data: result.rows[0] });
    } catch (error: any) {
        res.status(500).json({
            sucess: false,
            message: error.message

        })
    }
}



export const todosController = {
    createTodo,
}
