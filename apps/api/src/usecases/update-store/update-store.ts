


import { StoreRepository }
from '../../domain/store';


export class UpdateStoreUseCase {
  constructor(
    private readonly repository: StoreRepository
  ) {}

  async execute(
    id: string,
    name: string
  ) {
    if (!name.trim()) {
      throw new Error('Store name is required');
    }

    const store = await this.repository.update(
      id,
      name
    );

    if (!store) {
      return null;
    }

    return store;
  }
}
