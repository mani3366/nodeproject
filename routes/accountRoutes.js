import express from 'express';
import {
  createAccount,
  getAccounts,
  getAccountById,
  updateAccount,
  getDestinationsByAccount,
  deleteAccount
} from '../controllers/accountController.js';

const router = express.Router();

router.post('/', createAccount);
router.get('/:accountId/destinations', getDestinationsByAccount);
router.get('/', getAccounts);
router.get('/:id', getAccountById);
router.put('/:id', updateAccount);
router.delete('/:id', deleteAccount);

export default router;
