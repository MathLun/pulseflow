

import { describe, expect, it }
from 'vitest';

import { MemoryDatabase } 
from '../memory.database';

import { Migration } 
from './migration';

import { migrations }
from './migration-registry';

import { MigrationRunner }
from './migration-runner';

import { CreateStoresTableMigration }
from './001-create-stores-table';

describe('Migration Runner', () => {
	
	it('should execute all migrations', async () => {
		const database = new MemoryDatabase();
		migrations.push(new CreateStoresTableMigration(database));

		const runner = new MigrationRunner(database, migrations);

		await runner.run();


	       expect(migrations[0]?.id).toBe('001-create-stores-table');
	});

	it('should execute create stores table migration', async () => {
		const database = new MemoryDatabase();
		const migration = new CreateStoresTableMigration();

		await migration.up(database);

		expect(database.queries).toHaveLength(1);
	});
});
