import express, { Request, Response } from 'express';
import { pool } from '../../config/db';
import { userControllers } from './user.controller';
import auth from '../../middleware/auth';


const router = express.Router()

router.post("/", userControllers.createUser);
router.get("/", auth("admin"), userControllers.getAllUser);
router.get("/:id", auth("admin", "user"), userControllers.getSingleUser);
router.put("/:id", auth("admin", "user"), userControllers.updateUserData);
router.delete("/:id", auth("admin", "user"), userControllers.deleteUserData)

export const userRoutes = router;
