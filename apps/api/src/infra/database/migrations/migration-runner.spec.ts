

import { describe, expect, it }
from 'vitest';

import { MemoryDatabase } 
from '../memory.database';

import { Migration } 
from './migration';

import { MigrationRunner }
from './migration-runner';

describe('Migration Runner', () => {
	
	it('should execute all migrations', async () => {
		const database = new MemoryDatabase();
		const executed: string[] = [];

		const migration1: Migration = {
			id: '001',
			async up() {
				executed.push('001')
			}
		}

		const migration2: Migration = {
			id: '002',
			async up() {
				executed.push('002')
			}
		}

		const migrations = [
			migration1, 
			migration2
		];

		const runner = new MigrationRunner(database, migrations);

		await runner.run();

		expect(executed).toEqual([
			'001',
			'002'
		]);
	});
});
