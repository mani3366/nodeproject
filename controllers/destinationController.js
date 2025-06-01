import Destination from '../models/destination.js';
import Account from '../models/accounts.js';

// Create Destination
export const createDestination = async (req, res) => {
  try {
    const { url, httpMethod, headers, accountId } = req.body;

    // Check if account exists
    const account = await Account.findByPk(accountId);
    if (!account) return res.status(404).json({ error: 'Account not found' });

    const destination = await Destination.create({
      url,
      httpMethod,
      headers,
      accountId
    });
    res.status(201).json(destination);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all destinations
export const getDestinations = async (req, res) => {
  try {
    const destinations = await Destination.findAll();
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get destinations by accountId (query param)
export const getDestinationsByAccount = async (req, res) => {
  try {
    const { accountId } = req.params;
    const destinations = await Destination.findAll({ where: { accountId } });
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update destination
export const updateDestination = async (req, res) => {
  try {
    const destination = await Destination.findByPk(req.params.id);
    if (!destination) return res.status(404).json({ error: 'Destination not found' });

    const { url, httpMethod, headers } = req.body;
    await destination.update({ url, httpMethod, headers });
    res.json(destination);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete destination
export const deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findByPk(req.params.id);
    if (!destination) return res.status(404).json({ error: 'Destination not found' });

    await destination.destroy();
    res.json({ message: 'Destination deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
