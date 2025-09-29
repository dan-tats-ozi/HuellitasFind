const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "pacglcovmcxrjcwukbaa.supabase.co",
  database: "postgres",
  password: "*Oziel69*)=",
  port: 5432,
  ssl: { rejectUnauthorized: false }
});

module.exports = pool;