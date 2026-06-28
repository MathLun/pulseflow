


import type { FastifyInstance }
from 'fastify';

import { PostgresDatabase }
from '../infra/database';

import { OfferPostgresRepository }
from '../domain/offer';

import { StorePostgresRepository }
from '../domain/store';

import { CreateOfferUseCase }
from '../usecases/create-offer';

import { ListOffersUseCase }
from '../usecases/list-offers';

type CreateOfferBody = {
	storeId: string;
	title: string;
	description: string;
};

export async function offerRoutes(
	app: FastifyInstance,
	options: {
	  database: PostgresDatabase
	}
) {
	const offerRepository = new OfferPostgresRepository(options.database);
	const storeRepository = new StorePostgresRepository(options.database);


	app.post<{
	  Body: CreateOfferBody 
	}>('/offers', async (request, reply) => {
		try {
			const usecase = new CreateOfferUseCase(offerRepository);
			const offer = await usecase.execute(request.body);
			return reply.status(201).send({
				message: 'Offer criado com sucesso',
				data: offer
			});
		} catch (error) {
			console.error(error);
			return reply.status(500).send({
				message: 'Internal Server Error'
			});
		}
	});

	app.get('/offers', async (request, reply) => {
		try {
			const usecase = new ListOffersUseCase(offerRepository);
			const offers = await usecase.execute();

			return reply.status(200).send(offers);
		} catch (error) {
			return reply.status(500).send({
				message: 'Internal Server Error'
			});
		}
	});
}
