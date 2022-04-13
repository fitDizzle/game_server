const { Pool, Client } = require("pg");
const config = require("../database/config/config.json");
const Sequelize = require('sequelize');
const { host, user, password, database } = config.development;

const credentials = {
  user: "rgsfmkdctjvykl",
  host: "ec2-34-207-12-160.compute-1.amazonaws.com",
  database: "d4h5o5seoueaft",
  password: "af3b2530cd791b741a38e290e023818e2a9990a0f4ccdd88bf01ae3d06900505",
  port: 5432,
};

async function poolDemo() {
  const pool = new Pool(credentials);
  const now = await pool.query("SELECT NOW()");
  await pool.end();

  return now;
}

// Connect with a client.

async function clientDemo() {
  const client = new Client(credentials);
  await client.connect();
  const now = await client.query("SELECT NOW()");
  await client.end();

  return now;
}

// Use a self-calling function so we can use async / await.

(async () => {
  const poolResult = await poolDemo();
  console.log("Time with pool: " + poolResult.rows[0]["now"]);

  const clientResult = await clientDemo();
  console.log("Time with client: " + clientResult.rows[0]["now"]);
})();


module.exports = credentials


