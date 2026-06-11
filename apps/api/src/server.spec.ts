

import { describe, expect, it }
from 'vitest'

import { app }
from './server'

describe('Health Check', () => {
  it('should return status ok', async () => {
    const response = await app.inject({
	method: 'GET',
	url: '/health',
    });

    expect(response.statusCode).toBe(200);

    expect(response.json()).toEqual({
	status: 'ok',
    });
  });

  it('should return 404 for unknown route',
  async () => {
    const response = await app.inject({
	method: 'GET',
	url: '/health/check'
    });

    expect(response.statusCode).toBe(404);
  });
});
