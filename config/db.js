// config/db.js
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import pgtools from 'pgtools';

dotenv.config();

const {
  DB_USER,
  DB_PASS,
  DB_NAME,
  DB_HOST,
  DB_PORT,
  NODE_ENV = 'development'
} = process.env;

const config = {
  development: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
  }
};

const sequelizeConfig = config[NODE_ENV];

// Step 1: Create DB if it doesn't exist
const ensureDatabaseExists = async () => {
  try {
    await pgtools.createdb(
      {
        user: DB_USER,
        password: DB_PASS,
        port: DB_PORT,
        host: DB_HOST
      },
      DB_NAME
    );
    console.log(`✅ Database "${DB_NAME}" created`);
  } catch (err) {
    if (err.name === 'duplicate_database') {
      console.log(`ℹ️ Database "${DB_NAME}" already exists`);
    } else {
      console.error('❌ Error creating database:', err);
      throw err;
    }
  }
};

// Step 2: Connect to Sequelize
const sequelize = new Sequelize(
  sequelizeConfig.database,
  sequelizeConfig.username,
  sequelizeConfig.password,
  {
    host: sequelizeConfig.host,
    port: sequelizeConfig.port,
    dialect: sequelizeConfig.dialect,
    logging: false,
  }
);

// Run the creation + connection
await ensureDatabaseExists();

export default sequelize;
