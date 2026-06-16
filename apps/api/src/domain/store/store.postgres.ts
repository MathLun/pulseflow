

import { Store }
from './store';

import { PostgresDatabase }
from '../../infra/database/postgres.database';


export class StorePostgresRepository {
	constructor(private readonly database: PostgresDatabase) {}

	async create(store: Store): Promise<void>
	{
		await this.database.query(`
		  INSERT INTO stores (
			  id,
			  name,
			  created_at
		  ) VALUES ($1, $2, $3)
		`, [store.id, store.name, store.createdAt]);

	}

	async findAll(): Promise<Store[]> {
		const result = await this.database.query(`SELECT id, name, created_at FROM stores ORDER BY created_at ASC`);
		return result.rows.map(row => ({
			id: row.id,
			name: row.name,
			createdAt: row.created_at
		}));
	}

	async findById(id: string): Promise<Store | null> {
		const result = await this.database.query(`SELECT id, name, created_at FROM stores WHERE id = $1`, [id]);

		if (result.rows.length === 0) {
			return null;
		}

		const row = result.rows[0];

		return {
		  id: row.id,
		  name: row.name,
		  createdAt: row.createdAt
		};
	}
}
