

import "dotenv/config";

import { Client }
from 'pg';

async function run() {
	const client = new Client({
		connectionString: process.env.DATABASE_URL,
		ssl: {
		  rejectUnauthorized: false
		}
	});

	await client.connect();

	await client.query(`
	  CREATE TABLE IF NOT EXISTS stores (
		id TEXT PRIMARY KEY,
		name TEXT NOT NULL,
		created_at TIMESTAMP NOT NULL
	  );
	`);

	console.log('Stores table created');

	await client.end();
}

run().catch(error => {
  console.error(error);
  process.exit(1);
});
