

import { Migration } from './migration';
import { Database } from '../database';

export class CreateMigrationsTableMigration
implements Migration {
	public readonly id = '002-create-migrations-table';

	async up(database: Database): 
	Promise<void> {
		await database.query(`
		CREATE TABLE IF NOT EXISTS migrations (id TEXT PRIMARY KEY, executed_at TIMESTAMP NOT NULL);
		`);
	}
}
