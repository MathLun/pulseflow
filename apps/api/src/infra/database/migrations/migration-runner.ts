

import { Database } from '../database';

import { MigrationRegistry }
from './migration-registry';

import { Migration } 
from './migration';

export class MigrationRunner {
	constructor(
		private readonly database: Database,
		private readonly registry: MigrationRegistry,
		private readonly migrations: Migration[]
	) {}

	async run() {
		const executedIds = await this.registry.findExecutedIds();

		for(
			const migration of this.migrations
		) {
			if (executedIds.includes(migration.id)) { continue; }

			await migration.up(this.database); 
		}
	}
}
