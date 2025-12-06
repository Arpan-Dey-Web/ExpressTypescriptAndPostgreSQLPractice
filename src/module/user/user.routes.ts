import express, { Request, Response } from 'express';
import { pool } from '../../config/db';
import { userControllers } from './user.controller';


const router = express.Router()

router.post("/", userControllers.createUser);
router.get("/", userControllers.getAllUser);
router.get("/:id", userControllers.getSingleUser);
router.put("/:id", userControllers.updateUserData);
router.delete("/:id" ,userControllers.deleteUserData) 

export const userRoutes = router;
