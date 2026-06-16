

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
}
