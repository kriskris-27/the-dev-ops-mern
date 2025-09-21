import express from 'express';
import { 
  createTask, 
  getTasks, 
  getTaskById, 
  updateTask, 
  deleteTask,
  getTasksByUser 
} from '../controllers/taskController';

const router = express.Router();

// Task routes
router.route('/')
  .get(getTasks)
  .post(createTask);

router.route('/user/:userId')
  .get(getTasksByUser);

router.route('/:id')
  .get(getTaskById)
  .put(updateTask)
  .delete(deleteTask);

export default router;
