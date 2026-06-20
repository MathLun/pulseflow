

import "dotenv/config";

import { env }
from '../config/env';

import { PostgresDatabase }
from '../infra/database';

import { 
	MigrationRunner,
	PostgresMigrationRegistry,
	CreateStoresTableMigration,
	CreateMigrationsTableMigration
} from '../infra/database/migrations';

async function main() {
	const database = new PostgresDatabase(env.DATABASE_URL);

	await database.connect();

	const registry = new PostgresMigrationRegistry(database);

	const migrations = [
		new CreateMigrationsTableMigration(),
		new CreateStoresTableMigration()
	];

	const runner = new MigrationRunner(database, registry, migrations);

	await runner.run();

	await database.disconnect();
}

main();
