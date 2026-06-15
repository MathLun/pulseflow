


import { describe, expect, it }
from 'vitest';

import { InMemoryDatabase }
from './in-memory.database';

describe('Database Module', () => {
	it('should connect database', async () =>
	{
	  const database = new InMemoryDatabase()
	  const connect = database.connect()

	  await expect(connect).resolves.toBeUndefined();
	});

	it('should disconnect database', async () => 
	{
		const database = new InMemoryDatabase();
		const disconnect = database.disconnect();
		await expect(disconnect).resolves.toBeUndefined();
	});
});
