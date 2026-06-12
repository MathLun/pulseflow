

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

	expect(response.statusCode).toBe(500);
    });
});
