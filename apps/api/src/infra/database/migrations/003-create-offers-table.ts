

import { Database } from '../database';
import { Migration } from './migration';

export class CreateOffersTableMigration 
implements Migration {
  id = '002-create-offers-table';

  async up(database: Database): Promise<void> {
    await database.query(`
      CREATE TABLE IF NOT EXISTS offers (
        id TEXT PRIMARY KEY,
        store_id TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        created_at TEXT NOT NULL,

        CONSTRAINT fk_offer_store
          FOREIGN KEY (store_id)
          REFERENCES stores(id)
          ON DELETE CASCADE
      )
    `);
  }
}
