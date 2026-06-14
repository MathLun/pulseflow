

import type { Store, StoreRepository }
from '../../domain/store';
import { NotFoundError } from '../../errors';

type Input = {
	id: string
}

export class FindStoreByIdUseCase {
	constructor(private readonly repository: StoreRepository) {}

	async execute(input: Input): Promise<Store> {
		const store = await this.repository.findById(input.id);

		if (!store) {
			throw new NotFoundError('Store not found');
		}

		return store;
	}
}
