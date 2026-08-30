import {Router} from "express";
import * as courseController from "../controllers/courseController"
import * as timerController from "../controllers/timerController"

import {authMiddleware} from "../middlewares/authMiddleware"

export const router = Router();

router.use(authMiddleware);

router.get('/courses', courseController.getAllCourses);
router.get('/courses/:id', courseController.getCourseById);
router.post('/courses', courseController.createCourse);
router.put('/courses/:id',courseController.updateCourse);
router.delete('/courses/:id', courseController.deleteCourse);

router.get('/timers', timerController.getAllTimers);
router.get('/timers/:id', timerController.getTimerById);
router.post('/timers', timerController.createTimer);
router.put('/timers/:id',timerController.updateTimer);
router.delete('/timers/:id', timerController.deleteTimer);