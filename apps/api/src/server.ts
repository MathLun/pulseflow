

import "dotenv/config";
import Fastify from 'fastify';

import { env }
from './config/env';

import { PostgresDatabase }
from './infra/database/postgres.database';

import { storeRoutes } 
from './routes/store-routes';

import { AppError }
from './errors';


export const buildServer = async () => {
	const app = Fastify();

	const database = new PostgresDatabase(env.DATABASE_URL);

	await database.connect();

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

	app.register(storeRoutes, {
		database
	});

	return app
};
