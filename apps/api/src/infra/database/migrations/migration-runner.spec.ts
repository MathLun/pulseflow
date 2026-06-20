

import { describe, expect, it }
from 'vitest';

import { MemoryDatabase } 
from '../memory.database';

import { Migration } 
from './migration';

import { MemoryMigrationRegistry }
from './memory.migration.registry';

import { MigrationRunner }
from './migration-runner';

import { CreateStoresTableMigration }
from './001-create-stores-table';

describe('Migration Runner', () => {
	const database = new MemoryDatabase();
	const registry = new MemoryMigrationRegistry();
	
	it('should execute all migrations', async () => {
		const migrations: Migration[] = [];

		const createStoresMigration: Migration = {
			id: '001-create-stores-table',
			async up() {
			  migrations.push(this.id);
			}
		}

		const findAllStoresMigration: Migration = {
			id: '002-find-all-stores-table',
			async up() {
			  migrations.push(this.id);
			}
		}

		const runner = new MigrationRunner(database, registry, [createStoresMigration, findAllStoresMigration]);

		await runner.run();

	       expect(migrations).toEqual([
		       '001-create-stores-table',
		       '002-find-all-stores-table'
	       ]);
	});

	it('should execute create stores table migration', async () => {
		const migration = new CreateStoresTableMigration();

		await migration.up(database);

		expect(database.queries).toHaveLength(1);
	});

	it('should skip already executed migrations', async () => {
		const migrations: Migration[] = [];

		const migration = new CreateStoresTableMigration();
		await registry.register(migration.id);

		migrations.push(migration);

		const runner = new MigrationRunner(
			database,
			registry,
			migrations
		);

		await runner.run();

		expect(migrations[0]?.id).toEqual('001-create-stores-table');
	});
});
