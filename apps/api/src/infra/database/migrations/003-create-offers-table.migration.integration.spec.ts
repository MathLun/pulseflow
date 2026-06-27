

import 'dotenv/config';

import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest';

import { env } from '../../../config/env';
import { PostgresDatabase } from '../postgres.database';
import { CreateStoresTableMigration } from './001-create-stores-table';
import { CreateOffersTableMigration } from './003-create-offers-table';

const hasDatabase = Boolean(process.env.DATABASE_URL_TEST);

(hasDatabase ? describe : describe.skip)(
  'CreateOffersTableMigration',
  () => {
    const database = new PostgresDatabase(env.DATABASE_URL_TEST);

    beforeAll(async () => {
      await database.connect();

      // garante que a tabela stores exista
      await new CreateStoresTableMigration().up(database);
    });

    beforeEach(async () => {
      await database.query(`DROP TABLE IF EXISTS offers CASCADE`);
    });

    afterAll(async () => {
      await database.query(`DROP TABLE IF EXISTS offers CASCADE`);
      await database.disconnect();
    });

    it('should create offers table', async () => {
      const migration = new CreateOffersTableMigration();

      await migration.up(database);

      const result = await database.query<{
        table_name: string;
      }>(`
        SELECT table_name
        FROM information_schema.tables
        WHERE table_name = 'offers'
      `);

      expect(result.rows).toHaveLength(1);
      expect(result.rows[0].table_name).toBe('offers');
    });

    it('should create foreign key to stores table', async () => {
      const migration = new CreateOffersTableMigration();

      await migration.up(database);

      const result = await database.query<{
        constraint_name: string;
      }>(`
        SELECT constraint_name
        FROM information_schema.table_constraints
        WHERE table_name = 'offers'
          AND constraint_type = 'FOREIGN KEY'
      `);

      expect(result.rows).toHaveLength(1);
    });
  },
);
