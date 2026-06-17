

import { Database } from '../database';
import { Migration } from './migration';

export class MigrationRunner {
	constructor(
		private readonly database: Database,
		private readonly migrations: Migration[]
	) {}

	async run() {
		for(const migration of this.migrations) { await migration.up(this.database); }
	}
}
