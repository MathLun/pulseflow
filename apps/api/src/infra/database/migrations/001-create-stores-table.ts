

import { Database }
from '../database';

import { Migration }
from './migration';

export class CreateStoresTableMigration
implements Migration {
  id = '001-create-stores-table';

  async up(database: Database): Promise<void> {
    await database.query(`
      CREATE TABLE IF NOT EXISTS stores (
        id  TEXT PRIMARY KEY,
        name TEXT NOT NULL,
	created_at TEXT NOT NULL
      )
    `);
  }
}
