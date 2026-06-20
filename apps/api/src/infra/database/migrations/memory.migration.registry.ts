

import { MigrationRegistry }
from './migration-registry';

export class MemoryMigrationRegistry
extends MigrationRegistry {
	private migrations = new Set<string>();

	async findExecutedIds(): 
	Promise<string[]> {
		return [...this.migrations];
	}

	async register(
		migrationId: string
	): Promise<void> {
		this.migrations.add(migrationId);
	}
}
