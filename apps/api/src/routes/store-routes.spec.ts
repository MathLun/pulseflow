
import "dotenv/config";

import { describe, expect, it, beforeAll, afterAll, beforeEach }
from 'vitest';

import { env }
from '../config/env';

import { PostgresDatabase }
from '../infra/database/postgres.database';

import { buildServer } from '../server';

const hasDatabase = Boolean(process.env.DATABASE_URL_TEST);

(hasDatabase ? describe : describe.skip)('Stores Route', () => {
    const database = new PostgresDatabase(env.DATABASE_URL);

    let app: Awaited<ReturnType<typeof buildServer>>;

    beforeAll(async () => {
	    await database.connect();

	    app = await buildServer();
    });

    beforeEach(async () => {
	    await database.query(`DELETE FROM stores`);
    });

    afterAll(async () => {
	    await database.disconnect();
	    await app.close();
    });

    it('should create a store', async () => {
	const response = await app.inject({
		method: 'POST',
		url: '/stores',
		payload: {
		  name: 'Mercado Central'
		}
	});

	expect(response.statusCode).toBe(201);

	expect(response.json()).toMatchObject({
		name: 'Mercado Central'
	});
    });

    it('should return error when store name is empty', async () => {
	const response = await app.inject({
		method: 'POST',
		url: '/stores',
		payload: {
		  name: ''
		}
	});

	expect(response.statusCode).toBe(400);
    });

    it('should return empty stores list', async () => {
	
	await app.inject({
		method: 'POST',
		url: '/stores',
		payload: {
		  name: 'Store 1'
		}
	});
	const response = await app.inject({
		method: 'GET',
		url: '/stores'
	});

	expect(response.statusCode).toBe(200);
	expect(response.json()).toHaveLength(1);
    });

    it('should return store by id', async () => {
	const createResponse = await app.inject({
		method: 'POST',
		url: '/stores',
		payload: {
		  name: 'Store 1'
		}
	});

	const store = createResponse.json();

	const response = await app.inject({
		method: 'GET',
		url: `/stores/${store.id}`
	});

	expect(response.statusCode).toBe(200);
	expect(response.json()).toMatchObject({
		id: store.id,
		name: 'Store 1'
	});
    });

    it('should return 404 when store does not exist', async () => {
	const response = await app.inject({
		method: 'GET',
		url: '/stores/invalid-id'
	});

	expect(response.statusCode).toBe(404);
	expect(response.json()).toEqual({
		message: 'Store not found'
	});
    });

    it('should update store', async () => {
	const createResponse = await app.inject({
	  method: 'POST',
	  url: '/stores',
	  payload: {
	    name: 'Mercado Antigo'
	  }
    });
    
       const store = createResponse.json();

       const response = await app.inject({
	method: 'PUT',
	url: `/stores/${store.id}`,
	payload: {
	  name: 'Mercado Novo'
	}
       });

       expect(response.statusCode).toBe(200);
       expect(response.json()).toMatchObject({
	id: store.id,
	name: 'Mercado Novo'
       });
    });

    it('should return 404 when updating non-existent store', async () => {
      const response = await app.inject({
	method: 'PUT',
	url: '/stores/invalid-id',
	payload: {
	  name: 'Novo Nome'
	}
      });

      expect(response.statusCode).toBe(404);

      expect(response.json()).toEqual({
	      message: 'Store not found'
      });
    });

    it('should return 400 when updating with empty name', async () => {
  const createResponse = await app.inject({
    method: 'POST',
    url: '/stores',
    payload: {
      name: 'Store 1'
    }
  });

  const store = createResponse.json();

  const response = await app.inject({
    method: 'PUT',
    url: `/stores/${store.id}`,
    payload: {
      name: ''
    }
  });

  expect(response.statusCode).toBe(400);
});
});
