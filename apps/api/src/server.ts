

import "dotenv/config";
import Fastify from 'fastify';

import { env }
from './config/env';

import { PostgresDatabase }
from './infra/database/postgres.database';

import { storeRoutes } 
from './routes/store-routes';

import { offerRoutes }
from './routes/offer.routes';

import { AppError }
from './errors';


export const buildServer = async ({
	database
}:{ 
	database: PostgresDatabase
}) => {
	const app = Fastify();

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

	app.register(offerRoutes, {
		database
	});

	return app
};
