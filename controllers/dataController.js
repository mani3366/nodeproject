import Account from '../models/accounts.js';
import axios from 'axios';

export const handleIncomingData = async (req, res) => {
  try {
    const token = req.headers['cl-x-token'];
    const data = req.body;

    if (!token) {
      return res.status(401).json({ error: 'Un Authenticate' });
    }

    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      return res.status(400).json({ error: 'Invalid Data' });
    }

    // Find account by appSecret token
    const account = await Account.findOne({ where: { appSecret: token } });
    if (!account) {
      return res.status(401).json({ error: 'Un Authenticate' });
    }

    // Get destinations of account
    const destinations = await account.getDestinations();

    // Forward data to all destinations
    const forwardPromises = destinations.map(dest => {
      const config = {
        method: dest.httpMethod.toLowerCase(),
        url: dest.url,
        headers: dest.headers
      };

      if (config.method === 'get') {
        // Send data as query params
        config.params = data;
      } else if (config.method === 'post' || config.method === 'put') {
        // Send data as JSON body
        config.data = data;
      } else {
        // Unsupported method, skip forwarding
        return Promise.resolve();
      }

      return axios(config).catch(e => {
        console.error(`Failed to forward to ${dest.url}`, e.message);
      });
    });

    await Promise.all(forwardPromises);

    res.json({ message: 'Data forwarded successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
