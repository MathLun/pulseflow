

import { Database } from './database';

export class InMemoryDatabase
implements Database {
	async connect(): Promise<void> {}

	async disconnect(): Promise<void> {}
}
