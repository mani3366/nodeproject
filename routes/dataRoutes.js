import express from 'express';
import { handleIncomingData } from '../controllers/dataController.js';

const router = express.Router();

router.post('/incoming_data', handleIncomingData);

export default router;
