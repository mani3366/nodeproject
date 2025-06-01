import Account from './account.js';
import Destination from './destination.js';

// Define relationships here
Account.hasMany(Destination, {
  foreignKey: 'accountId',
  onDelete: 'CASCADE',
  as: 'destinations'
});

Destination.belongsTo(Account, {
  foreignKey: 'accountId',
  as: 'account'
});

export {
  Account,
  Destination
};
