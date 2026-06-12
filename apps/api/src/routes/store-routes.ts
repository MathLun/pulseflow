

import { FastifyInstance }
from 'fastify';

import { StoreInMemoryRepository }
from '../domain/store';

import { CreateStoreUseCase }
from '../usecases/create-store';

const repository = new StoreInMemoryRepository();

export async function storeRoutes(
	app: FastifyInstance
) {
	app.post('/stores', async (request, reply) => {
	  const { name } = request.body as { 
		  name: string
	  };

	  const usecase = new CreateStoreUseCase(repository);

	  const store = await usecase.execute({
		  name
	  });

	  return reply.status(201).send(store);
	});
}
