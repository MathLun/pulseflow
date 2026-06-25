

import { StoreRepository }
from '../../domain/store';

export class DeleteStoreUseCase {
	constructor(private readonly repository: StoreRepository) {}

	async execute(
		id: string
	): Promise<void | null> {
		const store = await this.repository.findById(id);

		if (!store) {
		  return null;
		}

		await this.repository.delete(id);
	}
}
