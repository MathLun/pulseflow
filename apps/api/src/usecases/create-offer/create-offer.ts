


import { randomUUID } 
from 'node:crypto';

import { Offer, OfferRepository } 
from '../../domain/offer';

interface CreateOfferInput {
  storeId: string;
  title: string;
  description: string;
}

export class CreateOfferUseCase {
  constructor(
    private readonly repository: OfferRepository,
  ) {}

  async execute(input: CreateOfferInput): Promise<Offer> {
    const offer: Offer = {
      id: randomUUID(),
      storeId: input.storeId,
      title: input.title,
      description: input.description,
      createdAt: new Date(),
    };

    await this.repository.create(offer);

    return offer;
  }
}
