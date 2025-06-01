import express from 'express';
import {
  createDestination,
  getDestinations,
  getDestinationsByAccount,
  updateDestination,
  deleteDestination
} from '../controllers/destinationController.js';

const router = express.Router();

router.post('/', createDestination);
router.get('/', getDestinations);
router.get('/account/:accountId', getDestinationsByAccount);
router.put('/:id', updateDestination);
router.delete('/:id', deleteDestination);

export default router;
