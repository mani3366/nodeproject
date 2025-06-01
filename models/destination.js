import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Account from '../models/accounts.js';

const Destination = sequelize.define('Destination', {
  url: { type: DataTypes.STRING, allowNull: false },
  httpMethod: { type: DataTypes.STRING, allowNull: false },
  headers: { type: DataTypes.JSON, allowNull: false }, // store headers as JSON
  accountId: { type: DataTypes.INTEGER, allowNull: false } // FK to Account
});

// Associations should be defined after importing both models
Account.hasMany(Destination, {
  foreignKey: 'accountId',
  onDelete: 'CASCADE',
  as: 'destinations'
});
Destination.belongsTo(Account, { foreignKey: 'accountId', as: 'account' });

export default Destination;
