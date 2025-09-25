import express from 'express';
import { fetchEmployeesData } from '../controller/tableController.js';

const router = express.Router();

router.get("/users", fetchEmployeesData);

export default router;
