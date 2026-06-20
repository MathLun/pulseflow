

import { MigrationRegistry }
from './migration-registry';

import { Database }
from '../database';

export class PostgresMigrationRegistry
extends MigrationRegistry {
	constructor(
		private readonly database: Database
	) {
		super();
	}

	async findExecutedIds():
	Promise<string[]> {
		try {
		  const result = await this.database.query<{ id: string }>(`SELECT id FROM migrations`); 
		  return result.rows.map(row => row.id);
		} catch {
		  return [];
		}
	}

	async register(
		migrationId: string
	): Promise<void> {
		await this.database.query(`INSERT INTO migrations (id, executed_at) VALUES ($1, NOW())`, [migrationId]);
	}
}
