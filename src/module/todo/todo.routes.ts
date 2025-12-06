import { Router } from "express";
import { todosController } from "./todo.controller";


const router = Router();

router.post("/",todosController.createTodo )



export const todoRoutes = router;
