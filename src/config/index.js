const dotEnv = require("dotenv");

if (process.env.NODE_ENV !== "prod") {
  const configFile = `./.env.dev}`;
  dotEnv.config({ path: configFile });
} else {
  dotEnv.config();
}

module.exports = {
  PORT: process.env.PORT || 8001,
  DB_URL: process.env.MONGODB_URI || 'mongodb://memory-db:27017/memory-book',
  APP_SECRET: process.env.APP_SECRET || 'memory_book'
};
