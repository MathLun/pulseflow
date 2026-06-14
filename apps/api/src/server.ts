

import Fastify from 'fastify';
import { storeRoutes } 
from './routes/store-routes';

import { AppError }
from './errors';

export const app = Fastify();

app.setErrorHandler((error, request, reply) => {
	if (error instanceof AppError) {
		return reply.status(error.statusCode).send({ message: error.message });
	}

	return reply.status(500).send({
		message: 'Internal Server Error'
	});
});
app.get('/health', async () => {
  return {
    status: 'ok'
  };
});

app.register(storeRoutes);
