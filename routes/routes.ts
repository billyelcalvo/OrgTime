import {Router} from "express";
import * as courseController from "../controllers/courseController"
import * as timerController from "../controllers/timerController"
export const router = Router();

router.get('/course', courseController.getAllCourses);
router.get('/course/:id', courseController.getCourseById);
router.post('/course', courseController.createCourse);
router.put('/course/:id',courseController.updateCourse);
router.delete('/course/:id', courseController.deleteCourse);

router.get('/timer', timerController.getAllTimers);
router.get('/timer/:id', timerController.getTimerById);
router.post('/timer', timerController.createTimer);
router.put('/timer/:id',timerController.updateTimer);
router.delete('/timer/:id', timerController.deleteTimer);