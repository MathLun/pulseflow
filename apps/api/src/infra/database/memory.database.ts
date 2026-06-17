

import { Database }
from './database';

export class MemoryDatabase
implements Database {
	private connected: boolean = false;

	private queries: {
		sql: string,
		params?: unknown[]
	}[] = [];

	async connect(): Promise<void> {
		this.connected = true;
	}

	async disconnect(): Promise<void> {
		this.connected = false;
	}

	async query<T = unknown>(
		sql: string,
		params?: unknown[]
	): Promise<T[]> {
		this.queries.push({
			sql,
			params
		});

		return [];
	}
}
