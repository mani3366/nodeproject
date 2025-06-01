import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';  // your sequelize instance with sqlite

const Account = sequelize.define('Account', {
  email: { type: DataTypes.STRING, },
  accountId: { type: DataTypes.STRING, },
  accountName: { type: DataTypes.STRING,},
  appSecret: { type: DataTypes.STRING, },
  website: { type: DataTypes.STRING }
});

export default Account;
