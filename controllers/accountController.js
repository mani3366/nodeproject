import Account from '../models/accounts.js';
import crypto from 'crypto';
import Destination from '../models/destination.js';

// Create Account
export const createAccount = async (req, res) => {
  try {
    const { email, accountId, accountName, website } = req.body;

    // Auto generate appSecret token
    const appSecret = crypto.randomBytes(32).toString('hex');

    const newAccount = await Account.create({
      email,
      accountId,
      accountName,
      website,
      appSecret
    });

    res.status(201).json(newAccount);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Read all accounts
export const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.findAll();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read account by id
export const getAccountById = async (req, res) => {
  try {
    const account = await Account.findOne({ where: { id: req.params.id } });
    if (!account) return res.status(404).json({ error: 'Account not found' });
    res.json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update account
export const updateAccount = async (req, res) => {
  try {
    const account = await Account.findOne({ where: { id: req.params.id } });
    if (!account) return res.status(404).json({ error: 'Account not found' });

    const { email, accountId, accountName, website } = req.body;
    await account.update({ email, accountId, accountName, website });
    res.json(account);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete account (with cascade delete of destinations)
export const deleteAccount = async (req, res) => {
  try {
    const account = await Account.findOne({ where: { id: req.params.id } });
    if (!account) return res.status(404).json({ error: 'Account not found' });

    await account.destroy();
    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getDestinationsByAccount = async (req, res) => {
  const { accountId } = req.params;

  try {
    const destinations = await Destination.findAll({
      where: { accountId }
    });

    if (!destinations || destinations.length === 0) {
      return res.status(404).json({ message: 'No destinations found for this account' });
    }

    res.json(destinations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};