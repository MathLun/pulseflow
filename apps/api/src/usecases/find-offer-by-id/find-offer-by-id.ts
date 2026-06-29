

import { OfferRepository } 
from '../../domain/offer';

type FindOfferByIdInput = {
	id: string;
};

type FindOfferByIdOutput = {
	id: string;
	storeId: string;
	title: string;
	description: string;
	createdAt: Date;
};

export class FindOfferByIdUseCase {
	constructor(private readonly repository: OfferRepository) {}
	async execute(input: FindOfferByIdInput): Promise<FindOfferByIdOutput | null> { 
	  const offer = await this.repository.findById(input.id);
	  if (!offer) return null;

	  return {
	    id: offer.id,
	    storeId: offer.storeId,
	    title: offer.title,
	    description: offer.description,
	    createdAt: offer.createdAt
	  };
	}
}
