

import { Database, QueryResult } 
from './database';

export class InMemoryDatabase
implements Database {
	async connect(): Promise<void> {}

	async disconnect(): Promise<void> {}

	async query<T = unknown>(): Promise<QueryResult<T>> {
		return {
		  rows: [],
		  rowCount: 0
		}
	}
}
