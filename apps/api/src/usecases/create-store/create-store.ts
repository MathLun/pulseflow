

import type { Store } from '../../domain/store';
import type { StoreRepository } from '../../domain/store';
import { ValidationError } from '../../errors';

type CreateStoreInput = {
  name: string;
};

export class CreateStoreUseCase {
	constructor(private readonly repository: StoreRepository) {}

	async execute(input: CreateStoreInput): Promise<Store> {
	  if (!input.name.trim()) {
	    throw new ValidationError('Store name is required');
	  }

	  const store: Store = {
	    id: crypto.randomUUID(),
	    name: input.name,
	    createdAt: new Date()
	  };

	  await this.repository.create(store);

	  return store;
	}
}
