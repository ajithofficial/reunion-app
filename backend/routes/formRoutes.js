import express from 'express';
import { formData } from '../controller/formController.js';

const router = express.Router();

router.post("/formdata", formData);

export default router;
