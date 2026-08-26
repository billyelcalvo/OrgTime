import {Router} from "express";
import * as courseController from "../controllers/courseController"
import * as timerController from "../controllers/timerController"
export const router = Router();

router.get('/course', courseController)