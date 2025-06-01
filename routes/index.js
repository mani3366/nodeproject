import express from 'express';
import accountRoutes from './accountRoutes.js';
import destinationRoutes from './destinationRoutes.js';
import dataRoutes from './dataRoutes.js';

const router = express.Router();

router.use('/accounts', accountRoutes);
router.use('/destinations', destinationRoutes);
router.use('/server', dataRoutes);

export default router;
