

import { PostgresDatabase }
from '../../infra/database/postgres.database';


export class StorePostgresRepository {
	constructor(private readonly database: PostgresDatabase) {}
}
