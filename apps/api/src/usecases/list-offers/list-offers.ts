

import { OfferRepository }
from '../../domain/offer';

type ListOffersOutput = {
	id: string;
	storeId: string;
	title: string;
	description: string;
	createdAt: string;
};

export class ListOffersUseCase {
	constructor(private readonly repository: OfferRepository) {}

	async execute(): Promise<ListOffersOutput[]> {
		const offers = await this.repository.findAll();

		return offers.map(offer => ({
		  id: offer.id,
		  storeId: offer.storeId,
		  title: offer.title,
		  description: offer.description,
		  createdAt: offer.createdAt
		}));
	}
}
