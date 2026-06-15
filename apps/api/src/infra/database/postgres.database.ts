

import { Client }
from 'pg';

import { Database }
from './database';

export class PostgresDatabase
implements Database {
  private client: Client;

  constructor(connectionString: string) {
	this.client = new Client({
		connectionString
	});
  }

  async connect(): Promise<void> {
	  await this.client.connect();
  }

  async disconnect(): Promise<void> {
	  await this.client.end();
  }

  async ping(): Promise<boolean> {
	  const result = await this.client.query(`SELECT 1 as health`);
	  return result.rows[0].health === 1;
  }
}
