

import { describe, expect, it }
from 'vitest';

import { app } from '../server';

describe('Stores Route', () => {
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
	expect(response.json()).toHaveLength(2);
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
});
