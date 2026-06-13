

import type { Store, StoreRepository }
from '../../domain/store';

type Input = {
	id: string
}

export class FindStoreByIdUseCase {
	constructor(private readonly repository: StoreRepository) {}

	async execute(input: Input): Promise<Store> {
		const store = await this.repository.findById(input.id);

		if (!store) {
			throw new Error('Store not found');
		}

		return store;
	}
}
