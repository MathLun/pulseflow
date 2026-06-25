

import { FastifyInstance }
from 'fastify';

import { env }
from '../config/env';

import { PostgresDatabase }
from '../infra/database/postgres.database';

import { StoreInMemoryRepository }
from '../domain/store';

import { StorePostgresRepository }
from '../domain/store';

import { CreateStoreUseCase }
from '../usecases/create-store';

import { ListStoresUseCase }
from '../usecases/list-stores';

import { FindStoreByIdUseCase }
from '../usecases/find-store-by-id';

import { UpdateStoreUseCase }
from '../usecases/update-store';

import { DeleteStoreUseCase }
from '../usecases/delete-store';

export async function storeRoutes(
	app: FastifyInstance,
	options: {
	  database: PostgresDatabase
	}
) {
	const repository = new StorePostgresRepository(options.database);

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

	app.get('/stores', async (request, reply) => {
	  const usecase = new ListStoresUseCase(repository);
	  const stores = await usecase.execute();

	  return stores;
	});

	app.get('/stores/:id', async (request, reply) => {
	  const { id } = request.params as {
		  id: string
	  };

	  const usecase = new FindStoreByIdUseCase(repository);

	  const store = await usecase.execute({ id });
	  return store;
	});

	app.put('/stores/:id', async (request, reply) => {
	  const { id } = request.params as {
		  id: string
	  };

	  const { name } = request.body as {
		  name: string
	  };

	  const usecase = new UpdateStoreUseCase(repository);

	  try {
	    const store = await usecase.execute(id, name);

	    if (!store) return reply.status(404).send({ message: 'Store not found' });

	    return reply.status(200).send(store);
	  } catch (e: unknown) {
	    return reply.status(400).send({
		    message: 'Store name is required'
	    });
	  }
	});

	app.delete('/stores/:id', async (request, reply) =>
	{
	  const { id } = request.params as {
		  id: string
	  };

	  const usecase = new DeleteStoreUseCase(repository);

	  try {
	    const result = await usecase.execute(id);
	    if (result === null) {
		return reply.status(404).send({ message: 'Store not found' });
	    } 

	    return reply.status(204).send();
	  } catch (e) {

	    if (e instanceof Error) {
		    return reply.status(400).send({ message: e.message });
	    }

	    return reply.status(500).send({ message: 'Internal Server Error' });
	  }
	  
	});
}
