

import "dotenv/config";
import { describe, expect, it, beforeAll, afterAll } from 'vitest';
import { env } from '../../../config/env';

import { PostgresDatabase } 
from '../postgres.database';

import { CreateMigrationsTableMigration }
from './002-create-migrations-table';

describe('Create Migrations Table Migration Database', () => {
	const database = new PostgresDatabase(env.DATABASE_URL_TEST);

	beforeAll(async () => {
		await database.connect();

		await database.query(`DROP TABLE IF EXISTS migrations`);
	});

	afterAll(async () => {
		await database.disconnect();
	});

	it('should create migrations table', async () => {
		const migration = new CreateMigrationsTableMigration();

		await migration.up(database);

		const result = await database.query<{ table_name: string }>(`
		SELECT table_name
		FROM information_schema.tables
		WHERE table_name = 'migrations'
		`);

		expect(result.rows).toHaveLength(1);
		expect(result.rows[0].table_name).toBe('migrations');
	});
});
