

import type { Store } from './store';
import type { StoreRepository } from './store.repository';

export class StoreInMemoryRepository
implements StoreRepository {
  private stores: Store[] = [];

  public async findById(
	  id: string
  ): Promise<Store | null> {
    const store = this.stores.find(
	store => store.id === id
    );

    return store ?? null;
  }

  public async findAll(): Promise<Store[]> {
    return this.stores;
  }

  public async create(
	  store: Store
  ): Promise<void> {
    this.stores.push(store);
  }
}
