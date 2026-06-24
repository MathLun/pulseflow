

import type { Store } from './store';

export interface StoreRepository {
  findById(id: string): Promise<Store | null>
  findAll(): Promise<Store[]>
  create(store: Store): Promise<void>
  update(id: string, name: string): Promise<Store | null>
}
