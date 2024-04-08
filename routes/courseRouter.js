import { Router } from 'express';
const router = Router();
import {
  getAllCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse
} from '../controllers/courseController.js';
import {
  validateCourseInput,
  validateIdParam,
} from '../middleware/validationMiddleware.js';
import { checkForTestUser } from '../middleware/authMiddleware.js';

// router.get('/',getAllCourses)
// router.post('/',createCourse)

router
  .route('/')
  .get(getAllCourses)
  .post(checkForTestUser, validateCourseInput, createCourse);


router
  .route('/:id')
  .get(validateIdParam, getCourse)
  .patch(checkForTestUser, validateCourseInput, validateIdParam, updateCourse)
  .delete(checkForTestUser, validateIdParam, deleteCourse);

export default router;
