

import type { StoreRepository }
from '../../domain/store';

export class ListStoresUseCase {
	constructor(private readonly repository: StoreRepository) {}

	async execute() {
	  const stores = await this.repository.findAll();
	  return stores;
	}
}
